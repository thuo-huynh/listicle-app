import httpService from '@/src/libs/http';
import ENDPOINTS from '../constants/endpoints';

/**
 * Get user profile
 * @returns User profile data
 */
export const getProfile = async () => {
  try {
    const response = await httpService.get(ENDPOINTS.PROFILE);
    if (response?.success) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
};

/**
 * Update user profile
 * @param data Updated profile data
 * @returns Updated profile if successful
 */
export const updateProfile = async (data: any) => {
  try {
    const response = await httpService.patch(ENDPOINTS.PROFILE, data);
    if (response?.success) {
      return await getProfile();
    }
    return null;
  } catch (error) {
    console.error('Profile update error:', error);
    return null;
  }
};

/**
 * Get available services
 * @returns List of services
 */
export const getServices = async () => {
  try {
    const response = await httpService.get(ENDPOINTS.SERVICES);
    if (response?.success) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Services fetch error:', error);
    return null;
  }
};

/**
 * Update a service
 * @param id Service ID
 * @param data Updated service data
 * @returns Updated list of services
 */
export const updateService = async (id: string, data: any) => {
  try {
    const response = await httpService.patch(ENDPOINTS.SERVICES, {
      servicesId: id,
      ...data,
    });

    if (response?.success) {
      return await getServices();
    }
    return null;
  } catch (error) {
    console.error('Service update error:', error);
    return null;
  }
};

/**
 * Delete a service
 * @param id Service ID to delete
 * @returns Updated list of services
 */
export const deleteService = async (id: string) => {
  try {
    const response = await httpService.delete(ENDPOINTS.SERVICES, {
      data: {
        servicesId: id,
      },
    });

    if (response?.success) {
      return await getServices();
    }
    return null;
  } catch (error) {
    console.error('Service delete error:', error);
    return null;
  }
};

/**
 * Add a new service
 * @param data Service data including image
 * @returns Updated list of services
 */
export const addService = async (data: any) => {
  try {
    const formData = new FormData();
    const objKeys = Object.keys(data);

    objKeys.forEach((key) => {
      formData.append(key, data[key]);
    });

    const response = await httpService.post(ENDPOINTS.SERVICES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response?.success) {
      return await getServices();
    }
    return null;
  } catch (error) {
    console.error('Service add error:', error);
    return null;
  }
};
