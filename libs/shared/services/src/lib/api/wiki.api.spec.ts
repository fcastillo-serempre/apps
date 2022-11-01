import wikiApi from './wiki.api';

describe('WikiApi', () => {
  it("Should has a default value for 'wikiApiUrl'", () => {
    expect(wikiApi.defaults.baseURL).toBe(process.env['NX_API_URL']);
  });

  it('should has x-token header in every request', async () => {
    localStorage.setItem('x-token', '1234567890');

    // const resp = await wikiApi.get('/auth');
    // console.log(resp);
  });
});
