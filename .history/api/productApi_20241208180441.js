// api/productApi.js

import axios from 'axios';
import qs from 'qs';  // Để mã hóa dữ liệu thành x-www-form-urlencoded

const fetchProductData = async () => {
    try {
      const response = await fetchProducts(selectedCategory);
      console.log('Fetched products:', response);  // Kiểm tra dữ liệu trả về
      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    const url = 'https://doanchuyenganh.site/ModelApp/ProductApp.php';  // API lấy tất cả sản phẩm

    const response = await axios.post(url, data, {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Lấy token và dữ liệu sản phẩm từ API
    const token = response.data.token;
    const products = response.data.data;

    // Trả về dữ liệu (token và sản phẩm)
    return { token, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Export đúng cách
export default fetchProducts;
