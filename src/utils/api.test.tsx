
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from './api';

const successSpy = jest.spyOn(toast, "success").mockImplementation(() => 'undefined');
const errorSpy = jest.spyOn(toast, "error").mockImplementation(() => 'undefined');

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('200 GET returns data', async () => {
    const mockData = [
      { "id": 1, "name": "Joe Doe" },
      { "id": 2, "name": "Jane Doe" }
    ]
    mockedAxios.mockResolvedValue({
      data: mockData,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
    const response = await api({
      url: 'test-endpoint',
      label: 'Test',
    })
      .then((data: any) => data)
      .catch(() => ({}));
    await waitFor(() => {
      expect(mockedAxios).toHaveBeenCalledWith({
        baseURL: undefined,
        data: {},
        headers: {},
        method: "GET",
        url: "test-endpoint",
      });
      expect(response).toBe(mockData);
    });
  });
  test('200 GET with default success toast', async () => {
    const mockData = [
      { "id": 1, "name": "Joe Doe" },
      { "id": 2, "name": "Jane Doe" }
    ]
    mockedAxios.mockResolvedValue({
      data: mockData,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
    await api({
      url: 'test-endpoint',
      label: 'Test',
      toastSuccess: true
    })
      .then((data: any) => data)
      .catch(() => ({}));
    await waitFor(() => {
      expect(successSpy).toBeCalledWith(
        "Test fetched successfully!",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#1797DA", "color": "#fff" }
        });
    });
  });
  test('200 GET with custom success toast', async () => {
    const mockData = [
      { "id": 1, "name": "Joe Doe" },
      { "id": 2, "name": "Jane Doe" }
    ]
    mockedAxios.mockResolvedValue({
      data: mockData,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
    await api({
      url: 'test-endpoint',
      label: 'Test',
      successMessage: 'custom success message'
    })
      .then((data: any) => data)
      .catch(() => ({}));
    await waitFor(() => {
      expect(successSpy).toBeCalledWith(
        "custom success message",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#1797DA", "color": "#fff" }
        });
    });
  });
  test('GET returns error message and shows toast', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: {
        error: 'Bad Request'
      },
      status: 400,
      statusText: 'Error',
      headers: {},
      config: {},
    });

    api({
      url: 'test-endpoint',
      label: 'Test',
    })
      .then((data: any) => data)
      .catch(() => ({}));

    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: undefined,
      data: {},
      headers: {},
      method: "GET",
      url: "test-endpoint",
    });
    await waitFor(() => {
      expect(errorSpy).toBeCalledWith(
        "Error: Bad Request",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#FF6060", "color": "#fff" }
        });
    });
  });

  test('400 GET returns error and shows toast', async () => {
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 400,
      }
    });
    api({
      url: 'test-endpoint',
      label: 'Test',
    })
      .then((data: any) => data)
      .catch(() => ({}));

    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: undefined,
      data: {},
      headers: {},
      method: "GET",
      url: "test-endpoint",
    });
    await waitFor(() => {
      expect(errorSpy).toBeCalledWith(
        "Test: Bad Request",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#FF6060", "color": "#fff" }
        });
    });
  });

  test('401 GET returns error and shows toast', async () => {
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 401,
      }
    });
    api({
      url: 'test-endpoint',
      label: 'Test',
    })
      .then((data: any) => data)
      .catch(() => ({}));

    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: undefined,
      data: {},
      headers: {},
      method: "GET",
      url: "test-endpoint",
    });
    await waitFor(() => {
      expect(errorSpy).toBeCalledWith(
        "Test: Unauthorized",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#FF6060", "color": "#fff" }
        });
    });
  });

  test('403 GET returns error and shows toast', async () => {
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 403,
      }
    });
    api({
      url: 'test-endpoint',
      label: 'Test',
    })
      .then((data: any) => data)
      .catch(() => ({}));

    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: undefined,
      data: {},
      headers: {},
      method: "GET",
      url: "test-endpoint",
    });
    await waitFor(() => {
      expect(errorSpy).toBeCalledWith(
        "Test: Forbidden",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#FF6060", "color": "#fff" }
        });
    });
  });
  test('404 GET returns error and shows toast', async () => {
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 404,
      }
    });
    api({
      url: 'test-endpoint',
      label: 'Test',
    })
      .then((data: any) => data)
      .catch(() => ({}));

    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: undefined,
      data: {},
      headers: {},
      method: "GET",
      url: "test-endpoint",
    });
    await waitFor(() => {
      expect(errorSpy).toBeCalledWith(
        "Test: Not Found",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#FF6060", "color": "#fff" }
        });
    });
  });

  test('500 GET returns error and shows toast', async () => {
    mockedAxios.mockRejectedValueOnce({
      response: {
        status: 500,
      }
    });
    api({
      url: 'test-endpoint',
      label: 'Test',
    })
      .then((data: any) => data)
      .catch(() => ({}));

    expect(mockedAxios).toHaveBeenCalledWith({
      baseURL: undefined,
      data: {},
      headers: {},
      method: "GET",
      url: "test-endpoint",
    });
    await waitFor(() => {
      expect(errorSpy).toBeCalledWith(
        "Test: Internal Server Error",
        {
          "duration": 2000,
          "style": { "backgroundColor": "#FF6060", "color": "#fff" }
        });
    });
  });
});
