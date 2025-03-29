/**
 * Secure Storage service using expo-secure-store
 */

import * as SecureStore from 'expo-secure-store';

class SecureStorageService {
  /**
   * Save a value to secure storage
   * @param key Key to store the value under
   * @param value Value to store
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error storing secure item:', error);
    }
  }

  /**
   * Get a value from secure storage
   * @param key Key to retrieve the value for
   * @returns The stored value or null if not found
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error retrieving secure item:', error);
      return null;
    }
  }

  /**
   * Delete a value from secure storage
   * @param key Key to delete
   */
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing secure item:', error);
    }
  }
}

const secureStorage = new SecureStorageService();
export default secureStorage;
