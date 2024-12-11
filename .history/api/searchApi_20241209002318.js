// searchApi.js
import axios from 'axios';

const searchProducts = async (token, searchText) => {
  try {
    const response = await axios.post('https://doanchuyenganh.site/ModelApp/SeachApp.php', {
      token: token,
      seach: searchText,  // Tìm kiếm theo từ khóa
    });

    return response.data;
  } catch (error) {
    console.error('Error during search:', error);
    throw error;
  }
};

export default searchProducts;
