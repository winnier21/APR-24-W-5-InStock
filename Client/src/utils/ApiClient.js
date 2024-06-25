import axios from "axios";


export class ApiClient {
  
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }
  
  createRequestUrl(endpoint) {
    const requestUrl = `${this.baseUrl}/${endpoint}`;
    return requestUrl;
  }
  
  logResponse(response, endpoint, verb) {
    // Helper method to perform console.log() on API response objects.
    // Not invoked when submitted for grading by TAs.
    console.log(`${verb} API response status for "${endpoint}" endpoint: \n${response.status} - ${response.statusText}.`);
    console.log(response);
  }
  
  async get(endpoint) {
    /* Helper method for making GET requests (following DRY principle). 
    Called upon by the `.getVideo()` and `.getVideosArray()` methods. */
    const requestUrl = this.createRequestUrl(endpoint);
    try {
      const response = await axios.get(requestUrl);
      const data = response.data;
      return data;
    } catch (error) {
      return false;
    }
  }
  
  async getItemsArray() {
    const endpoint = 'api/inventories';
    const itemsArray = await this.get(endpoint);
    // this.logResponse(itemsArray, endpoint, 'GET');
    return itemsArray;
  }
  
  async getItem(itemId) {
    const endpoint = `api/inventories/${itemId}`
    const itemObject = await this.get(endpoint);
    return itemObject;
  }
  
  async post(endpoint, bodyObject) {
    const requestUrl = this.createRequestUrl(endpoint);
    const headers = {'Content-Type': 'application/json'};
    try {
      const response = await axios.post(requestUrl, bodyObject, headers);
      return response
    } catch (error) {
      return false;
    }
  }
  
  async postWarehouse(warehouseObject) {
    const endpoint = 'api/warehouses'
    const response = await this.post(endpoint, warehouseObject);
    return response;
  }
  
  async postItem(itemObject) {
    const endpoint = `api/inventories`;
    const response = await this.post(endpoint, itemObject);
    return response;
  }
}

const apiInstance = new ApiClient();
export default apiInstance;