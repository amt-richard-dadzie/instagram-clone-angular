import { TestBed } from '@angular/core/testing';

import { FeedService } from './feed.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('FeedService', () => {
  let feedService: FeedService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    feedService = TestBed.inject(FeedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(feedService).toBeTruthy();
  });

  it('should return filtered posts', (done) => {
    const mockResponse = {
      data: {
        items: [
          { media_name: 'album', carousel_media_count: 2 },
          { media_name: 'reel' },
          { media_name: 'photo' },
          { media_name: 'album', carousel_media_count: 0 },
        ],
      },
    };

    feedService.getPosts('testuser').subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual([
        { media_name: 'album', carousel_media_count: 2 },
        { media_name: 'reel' },
      ]);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}v1/posts?username_or_id_or_url=testuser`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return sliced following list', (done) => {
    const mockResponse = {
      data: {
        items: Array(15).fill({ id: 'user' }),
      },
    };

    feedService.getFollowing().subscribe((following) => {
      expect(following.length).toBe(2);
      expect(following).toEqual([{ id: 'user' }, { id: 'user' }]);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}v1/following?username_or_id_or_url=cddzeney`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return a list of users', (done) => {
    const mockResponse = {
      data: {
        items: [{ username: 'user1' }, { username: 'user2' }],
      },
    };

    feedService.searchUser('query').subscribe((res) => {
      expect(res.data.items.length).toBe(2);
      expect(res.data.items).toEqual(mockResponse.data.items);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}v1/search_users?search_query=query`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return hashtag search results', (done) => {
    const mockResponse = {
      data: {
        items: [{ name: 'tag1' }, { name: 'tag2' }],
      },
    };

    feedService.searchHashTags('query').subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}v1/search_hashtags?search_query=query`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  it('should return a blob URL', (done) => {
    const mockBlob = new Blob([''], { type: 'image/jpeg' });
    const mockUrl = 'blob:http://example.com/1234-5678';

    // Mock window.URL.createObjectURL
    window.URL.createObjectURL = jest.fn(() => mockUrl);

    feedService.getImage('http://example.com/image.jpg').subscribe((url) => {
      expect(url).toBe(mockUrl);
      expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      done();
    });

    const req = httpTestingController.expectOne('http://example.com/image.jpg');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(mockBlob);
  });
});
