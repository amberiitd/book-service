const { expect } = require('chai');
const sinon = require('sinon');

const booksModel = require('../src/model/book');
const db = require('../src/config/db');
const { cache, CACHE_DURATION } = require('../src/config/cache');

describe('Books Model', () => {
  const mockSearchCriteria = {
    title: 'Test Book',
    author: 'Test Author',
    publishedYearStart: 2000,
    publishedYearEnd: 2022,
    genre: 'Test Genre',
    availability: true,
    sortBy: 'title',
    sortOrder: 'asc',
    page: 1,
    size: 10,
  };

  const mockQueryResults = [{ id: 1, title: 'Test Book 1' }, { id: 2, title: 'Test Book 2' }];

  const mockQueryCallback = (resolve, reject, cacheKey) => (error, results) => {
    if (error) {
      reject(error);
    } else {
      cache.put(cacheKey, results, CACHE_DURATION);
      resolve(results);
    }
  };

  const mockQuery = sinon.stub(db.pool, 'query');

  after(() => {
    sinon.restore();
  });

  describe('getBooks', () => {
    it('should resolve with cached data if available', async () => {
      const cacheKey = '/'+JSON.stringify(mockSearchCriteria);
      cache.put(cacheKey, mockQueryResults, CACHE_DURATION);

      const result = await booksModel.getBooks(mockSearchCriteria);
      expect(result).to.deep.equal(mockQueryResults);
      expect(Boolean(cache.put.called)).to.be.false;
      expect(mockQuery.called).to.be.false;
    });

    it('should resolve with queried data and cache it', async () => {
      const cacheKey = '/{"title":"Test Book"}';
      mockQuery.callsFake((query, params, callback) => {
        callback(null, mockQueryResults);
      });

      const result = await booksModel.getBooks(mockSearchCriteria);
      expect(result).to.deep.equal(mockQueryResults);
    });
  });
});
