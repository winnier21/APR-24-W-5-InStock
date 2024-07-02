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
    console.log(`Data:`, response.data);
  }
  
  async get(endpoint) {
    /* Helper method for making GET requests (following DRY principle). */
    const requestUrl = this.createRequestUrl(endpoint);
    try {
      const response = await axios.get(requestUrl);
      const data = response.data;
      // this.logResponse(response, endpoint, 'GET');
      return data;
    } catch (error) {
      const responseMessage = error.response.data;
      console.log(responseMessage, typeof responseMessage);
      return false;
    }
  }

  async getItemsArray(route) {
    const endpoint = `api/${route}`;
    const itemsArray = await this.get(endpoint);
    return itemsArray;
  }
  
  async getItem(route, id) {
    /* 
    A24W5-26 API to GET a Single Inventory Item 
    */
    const endpoint = `api/${route}/${id}`
    const data = await this.get(endpoint);
    return data;
  }
  
  async getWarehouseItems(warehouseId) {
    const endpoint = `api/warehouses/${warehouseId}/inventories`;
    const data = await this.get(endpoint);
    return data;
  }
  
  async post(route, bodyObject) {
    /* 
    A24W5-28 API to POST/CREATE a New Inventory Item
      const response = apiInstance.postItem('inventories', itemObject);

    A24W5-16 API to POST/CREATE a New Warehouse
      const response = apiInstance.postItem('warehouses', warehouseObject);
    */
    const endpoint = `api/${route}`;
    const requestUrl = this.createRequestUrl(endpoint);
    const headers = {'Content-Type': 'application/json'};
    try {
      const response = await axios.post(requestUrl, bodyObject, headers);
      if (Math.floor(response.status / 100) === 2) {
        return response.data;
      }
    } catch (error) {
      const responseMessage = error.response.data;
      return responseMessage;
    }
  }
  
  async put(route, id, bodyObject) {
    /* 
    A24W5-18 PUT/EDIT a Warehouse 
      const data = apiInstance.put('warehouses', warehouseId, warehouseObject);

    A24W5-29 API to PUT/EDIT an Inventory Item
      const data = apiInstance.put('inventories', itemId, itemObject);
    */
    try {
      const endpoint = `api/${route}/${id}`;
      const requestUrl = this.createRequestUrl(endpoint);
      const response = await axios.put(requestUrl, bodyObject);
      if (Math.floor(response.status / 100) === 2) {
        return response.data;
      }
    } catch (error) {
      const responseMessage = error.response.data;
      return responseMessage;
    }
  }

  async delete(route, id) {
    try {
      const endpoint = `api/${route}/${id}`;
      const requestUrl = this.createRequestUrl(endpoint);
      const response = await axios.delete(requestUrl);
      // this.logResponse(response, endpoint, 'DELETE');
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const apiInstance = new ApiClient();
export default apiInstance;