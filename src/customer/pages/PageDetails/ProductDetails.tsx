import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import Shield from '@mui/icons-material/Shield'
import { teal } from '@mui/material/colors'
import { Button, Divider } from '@mui/material'
import WorkspacePremium from '@mui/icons-material/WorkspacePremium';
import LocalShipping from '@mui/icons-material/LocalShipping';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import SimilarProduct from './SimilarProduct'
import ReviewCard from '../Review/ReviewCard'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../../State/customer/ProductSlice'
import { addItemToCart } from '../../../State/customer/CartSlice'

const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useAppDispatch()
  const { productId } = useParams();
  const { product } = useAppSelector(store => store);
  const [activeImage, setActiveImage] = useState(0);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes: string[] = product.product?.sizes
    ? product.product.sizes.split(",").map(s => s.trim())
    : [];


  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)))
  }, [productId]);

  useEffect(() => {
    if (product.product?.sizes?.length === 1) {
      setSelectedSize(product.product.sizes[0]);
    }
  }, [product.product]);

  useEffect(() => {
    if (product.product?.sizes?.length === 0) {
      setSelectedSize("FREE");
    }
  }, [product.product]);

  const handleActiveImage = (value: number) => () => {
    setActiveImage(value)
  }

  const handleAddToCart = () => {
    if (!jwt) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }

    if (!product.product?.id) return;

    if (!selectedSize) {
      alert("Vui lòng chọn size");
      return;
    }

    dispatch(
      addItemToCart({
        jwt,
        request: {
          productId: product.product.id,
          size: selectedSize,
          quantity: quantity,
        },
      })
    );
  };



  return (
    <div className='px-5 lg:px-20 pt-10'>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <section className='flex flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
            {product.product?.images.map((item, index) =>
              <img
                onClick={handleActiveImage(index)}
                className='lg:w-full w-[50px] cursor-pointer rounded-md'
                src={item} alt="" />
            )}
          </div>

          <div className='w-full lg:w-[85%]'>
            <img className='w-full rounded-md'
              src={product.product?.images[activeImage]} alt="" />
          </div>
        </section>

        <section>
          <h1
            className='font-bold text-lg text-primary-color'
          >{product.product?.seller?.businessDetails.businessName}</h1>

          <p
            className='text-gray-500 font-semibold'
          >{product.product?.title}</p>

          <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
            <div className='flex gap-1 items-center'>
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider orientation='vertical' flexItem />
            <span>234 Ratings</span>
          </div>

          <div>
            <div className='price flex items-center gap-3 mt-5 text-xl'>
              <span className='font-sans text-gray-800'>
                {/* {(item.mrpPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })} */}
                {product.product?.sellingPrice ? (product.product.sellingPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : '0 VND'}
              </span>
              <span className='line-through text-gray-400'>
                {product.product?.mrpPrice ? (product.product.mrpPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : '0 VND'}
              </span>
              <span className='text-primary-color font-semibold'>
                {product.product?.discountPercent ? (product.product.discountPercent) + "%" : '0%'}
              </span>
            </div>
            <p
              className='text-sm mt-2'>
              Đã bao gồm tất cả các loại thuế. Miễn phí vận chuyển cho đơn hàng trên 300.000 VND.
            </p>
          </div>

          <div className='mt-7 space-y-3'>

            <div className='flex items-center gap-4'>
              <Shield sx={{ color: teal[500] }} />
              <p>Hàng chính hãng & Đảm bảo chất lượng</p>
            </div>

            <div className='flex items-center gap-4'>
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>Đảm bảo hoàn tiền 100%</p>
            </div>

            <div className='flex items-center gap-4'>
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Miễn phí vận chuyển và đổi trả</p>
            </div>

          </div>

          <div className="mt-7 space-y-2">
            <h1>Chọn size</h1>

            <div className="flex gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{ minWidth: "50px" }}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>



          <div className='mt-7 space-y-2'>
            <h1
            >Số lượng</h1>

            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}>
                <RemoveIcon />
              </Button>

              <span>
                {quantity}
              </span>

              <Button
                onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </Button>
            </div>

          </div>

          <div className='mt-12 flex items-center gap-5'>
            <Button
              onClick={handleAddToCart}
              fullWidth
              variant='contained'
              startIcon={<AddShoppingCartIcon />}
              sx={{ py: "1rem" }}>
              Thêm vào giỏ hàng
            </Button>

            <Button
              fullWidth
              variant='outlined'
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}>
              Yêu thích
            </Button>
          </div>

          <div className='mt-5'>
            <p>
              {product.product?.description}
            </p>
          </div>

          <div className='mt-12 space-y-5'>
            <ReviewCard />
            <Divider />
          </div>

        </section>
      </div>

      <div className='mt-20'>
        <h1 className="text-lg font-bold text-primary-color">
          Sản phẩm tương tự
        </h1>

        <div className='pt-5'>
          <SimilarProduct />
        </div>
      </div>

    </div>
  )
}

export default ProductDetails
