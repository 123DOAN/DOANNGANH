const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    {
      id: 1, 
      name: 'TMPRARY CRINKLE JACKET', 
      price: 1390000, 
      image: 'outer1.jpg', 
      description: `
        FEATURES:
        - 20% cotton, 80% polyester 
        - Dây rút điều chỉnh độ dài gấu áo
        - 02 túi áo ngoài
        - 01 túi áo trong
  
        SIZE CHART:
        - Size M: dài 72cm - ngang 52cm - vai 48cm - dài tay 66cm
        - Size L: dài 74cm - ngang 54cm - vai 52cm - dài tay 67cm
        - Size XL: dài 78cm - ngang 56cm - vai 54cm - dài tay 68cm
      `, 
      category: 'Outer'
    },
    {
      id: 2, 
      name: 'BROWN WASHED MESH MIX WINDBREAKER JACKET', 
      price: 750000, 
      image: 'outer2.jpg', 
      description: `
        FEATURES:
        - 70% poly 30% mesh
        - Form regular fit
        - Khóa kéo 02 chiều
        - Dây rút 02 cái thân áo

        SIZE CHART:
        - Size M: dài 65cm - ngang 56cm - dài tay 60cm
        - Size L: dài 68cm - ngang 58cm - dài tay 63cm
        - Size XL: dài 72cm - ngang 60cm - dài tay 66cm

      `, 
      category: 'Outer'
    },
    {
        id: 3, 
        name: 'MULTI ZIPPER QUILTED BOMBER JACKET', 
        price: 1390000, 
        image: 'outer3.jpg', 
        description: `
          FEATURES:
        - Bông chần 24oz
        - Bên trong mũ lót lông
        - In lụa
        - Tag da và dệt
        - 02 túi sườn
        - 02 túi ẩn
        - Khóa kéo dọc mũ có thể tách
        - Khoá kéo 02 chiều đằng trước
        - Khoá kéo 02 chiều bên cánh tay
        - Form regular fit

          SIZE CHART:
        - Size M: dài 70cm - ngang 63cm- vai 57cm - dài tay 61cm
        - Size L: dài 73cm - ngang 66cm - vai 59cm - dài tay 63cm
        - Size XL: dài 76cm - ngang 69cm - vai 61cm - dài tay 65cm
        `, 
        category: 'Outer'
      },
      {
        id: 4, 
        name: 'GOTM WASHED KNIT SWEATER', 
        price: 760000, 
        image: 'knit1.jpg', 
        description: `
          FEATURES:
        - 100% cotton len với thành phần chính là wool
        - Sợi len dệt ribbed 02 mặt
        - Làm rách thủ công
        - Mặc được 02 mặt
        - In lụa 02 mặt

          SIZE CHART:
        - Size M: dài 67cm - ngang 52cm - dài tay 76cm
        - Size L: dài 68cm - ngang 54cm - dài tay 78cm
        - Size XL: dài 70cm - ngang 56cm - dài tay 80cm
        `, 
        category: 'Knitwear'
      },
      {
        id: 5, 
        name: 'PANELED CROCHET KNIT HOODIE', 
        price: 960000, 
        image: 'knithoodie.jpg', 
        description: `
          FEATURES:
        - Len cotton cable phối 02 màu
        - 01 tag da kim loại đúc tên thương hiệu
        - Form slim fit

          SIZE CHART:
        - Size M: dài 63cm - ngang 53cm - dài tay 72cm
        - Size L: dài 65cm - ngang 55cm - dài tay 74cm
        - Size XL: dài 67cm - ngang 58cm - dài tay 76cm
        `, 
        category: ['Knitwear', 'Sweatershirt & Hoodie']
      },
      {
        id: 6, 
        name: 'LOGO WASHED KNIT SWEATER', 
        price: 690000, 
        image: 'knit2.jpg', 
        description: `
          FEATURES:
        - Chất liệu 60% cotton và 40% acrylic
        - Đan len
        - Giặt nhuộm
        - Phun

          SIZE CHART:
        - Size M: dài 65cm - ngang 55cm - dài tay 67cm
        - Size L: dài 69cm - ngang 57cm - dài tay 70cm
        - Size XL: dài 71cm - ngang 59cm - dài tay 73cm
        `, 
        category: 'Knitwear'
      },
      {
        id: 7, 
        name: 'HA BROWN WASHED TSHIRT', 
        price: 510000, 
        image: 'tshirt1.jpg', 
        description: `
          FEATURES:
        - 100% cotton
        - Form regular fit
        - Xử lí wash acid
        - In lụa

          SIZE CHART:
        - Size XS: dài 62cm - ngang 49cm - vai 49cm - dài tay 16cm
        - Size S: dài 64cm - ngang 51cm - vai 51cm - dài tay 18cm
        - Size M: dài 66cm - ngang 53cm - vai 52cm - dài tay 20cm
        - Size L: dài 69cm - ngang 56cm - vai 54cm - dài tay 22cm
        `, 
        category: 'T-Shirt'
      },
      {
        id: 8, 
        name: 'EVA HOOD TSHIRT', 
        price: 620000, 
        image: 'tshirt2.jpg', 
        description: `
          FEATURES:
        - 100% cotton
        - In lụa trước ngực
        - Cắt xẻ thân áo
        - Tag thương hiệu gắn dưới gấu
        - Dây rút cao su trên mũ

          SIZE CHART:
        - Size M: dài 70cm - ngang 57cm - vai 52cm - dài tay 65cm
        - Size L: dài 73cm- ngang 61cm - vai 53cm - dài tay 66cm
        - Size XL: dài 76cm - ngang 64cm - vai 54cm - dài tay 68cm
        `, 
        category: 'T-Shirt'
      },
      {
        id: 9, 
        name: 'HA RED WASHED TSHIRT', 
        price: 510000, 
        image: 'tshirt3.jpg', 
        description: `
          FEATURES:
        - 100% cotton
        - Giặt nhuộm
        - In lụa 
        - Cắt xẻ tạo hình
        - Tag canvas 

          SIZE CHART:
        - Size M: dài 69cm - ngang 55cm - vai 49cm - dài tay 20cm
        - Size L: dài 72cm - ngang 57cm - vai 50cm - dài tay 21cm
        - Size XL: dài 74cm - ngang 59cm - vai 53cm - dài tay 22cm
        - Size XXL: dài 76cm - ngang 61cm - vai 54cm - dài tay 24cm
        `, 
        category: 'T-Shirt'
      },
      {
        id: 10, 
        name: 'F/A PINK WASHED HOODIE', 
        price: 720000, 
        image: 'hoodie1.jpg', 
        description: `
          FEATURES:
        - 100% cotton
        - Giặt nhuộm
        - In lụa + cao thành
        - Túi bụng
        - 02 cúc bấm trên mũ
 
          SIZE CHART:
        - Size M: dài 63cm - ngang 58cm - dài tay 64cm
        - Size L: dài 66cm - ngang 60cm - dài tay 68cm
        - Size XL: dài 70cm - ngang 62cm - dài tay 72cm
        - Size XXL: dài 73cm - ngang 64cm - dài tay 75cm
        `, 
        category: 'Sweatershirt & Hoodie'
      },
      {
        id: 11, 
        name: 'GOTM WASHED HOODIE', 
        price: 760000, 
        image: 'hoodie2.jpg', 
        description: `
          FEATURES:
        - 100% cotton
        - Giặt nhuộm
        - In lụa + cao thành
        - Túi bụng
        - Thiết kế cách điệu mũ

          SIZE CHART:
        - Size M: dài 63cm - ngang 58cm - dài tay 64cm
        - Size L: dài 66cm - ngang 60cm - dài tay 68cm
        - Size XL: dài 70cm - ngang 62cm - dài tay 72cm
        - Size XXL: dài 73cm - ngang 64cm - dài tay 75cm
        `, 
        category: 'Sweatershirt & Hoodie'
      },
      {
        id: 12, 
        name: 'SFTD BEIGE WASHED RAGLAN SHIRT', 
        price: 520000, 
        image: 'shirt2.jpg', 
        description: `
          FEATURES:
        - 100% cotton
        - Form boxy
        - Giặt nhuộm tạo hiệu ứng
        - Đánh rách thủ công

          SIZE CHART:
        - Size M: dài 59cm - ngang 60cm - vai 49cm – dài tay 21cm 
        - Size L: dài 61cm - ngang 62cm - vai 51cm – dài tay 23cm 
        - Size XL: dài 63cm - ngang 64cm - vai 53cm – dài tay 24cm
        - Size XXL: dài 66cm - ngang 66cm - vai 54cm - dài tay 25cm
        `, 
        category: 'Shirt'
      },
      {
        id: 13, 
        name: 'TMPRARY CUPRO TANK SHIRT', 
        price: 1190000, 
        image: 'shirt1.jpg', 
        description: `
          FEATURES:
        - 100% Cupro
        - In lụa trước và sau
        - Form tankshirt

          SIZE CHART:
        - Size M: dài 69cm - ngang 59cm - vai 49cm
        - Size L: dài 71cm - ngang 61cm - vai 51cm
        - Size XL: dài 74cm - ngang 64cm - vai 53cm
        `, 
        category: 'Shirt'
      },
      {
        id: 14, 
        name: 'TMPRARY LONG SLEEVES SHIRT', 
        price: 1290000, 
        image: 'shirt3.jpg', 
        description: `
          FEATURES:
        - 95% Cotton 5% Polyester
        - Form regular fit
        - In lụa trước ngực
        - Vải có hiệu ứng washed

          SIZE CHART:
        - Size M: dài 72cm - ngang 52cm - vai 48cm - dài tay 66cm
        - Size L: dài 74cm - ngang 54cm - vai 52cm - dài tay 67cm
        - Size XL: dài 78cm - ngang 56cm - vai 54cm - dài tay 68cm
        `, 
        category: 'Shirt'
      },
      {
        id: 15, 
        name: 'PUFFER BROWN WASHED NYLON PANTS', 
        price: 720000, 
        image: 'bottoms1.jpg', 
        description: `
          FEATURES:
        - 100% polyester 
        - Giặt nhuôm
        - Lớp chần bông nhẹ bên trong
        - 03 túi có khoá ẩn
        - Chun ống quần

          SIZE CHART:
        - Size M: bụng 62cm - dài 95cm - đáy 40cm - đùi 34cm - ống 15cm
        - Size L: bụng 65cm - dài 98cm - đáy 41cm - đùi 35cm - ống 16cm
        - Size XL: bụng 68cm - dài 101cm - đáy 42cm - đùi 36cm - ống 17cm
        `, 
        category: 'Bottoms'
      },
      {
        id: 16, 
        name: 'WIDE LEG WASHED MOTOR SWEATPANTS', 
        price: 1290000, 
        image: 'bottoms2.jpg', 
        description: `
          FEATURES:
        - Chất liệu 100% nỉ cotton
        - Giặt mài tạo hiệu ứng
        - Form wide leg
        - Cắt xẻ tạo hình
        - 04 túi quần
        - Dây điều chỉnh độ rộng đai quần

          SIZE CHART:
        - Size M: bụng 74cm - dài 100cm - đũng 29cm - ống 58cm
        - Size L: bụng 77cm - dài 104cm - đũng 30cm - ống 60cm
        - Size XL: bụng 80cm - dài 109cm - đũng 31cm - ống 62cm
        `, 
        category: 'Bottoms'
      },
  ];
  

app.get('/api/products', (req, res) => {
  res.json(products);
});

// Lọc sản phẩm theo danh mục
app.get('/api/products/category/:category', (req, res) => {
    const categoryParam = req.params.category.toLowerCase();  // Chuyển category từ request thành chữ thường
  
    const filteredProducts = products.filter(product => 
      typeof product.category === 'string' && product.category.toLowerCase() === categoryParam
    );
  
    if (filteredProducts.length > 0) {
      res.json(filteredProducts);
    } else {
      res.status(404).json({ message: 'No products found for this category' });
    }
  });

// Lấy sản phẩm theo ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });

app.listen(port, () => {
  console.log(`API đang chạy tại http://localhost:${port}`);
});
