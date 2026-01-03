import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material"
import "tailwindcss/tailwind.css"
import { AddPhotoAlternate } from '@mui/icons-material'
import { Close } from '@mui/icons-material'
import { isTemplateMiddle } from "typescript"
import { menLevelTwo } from '../../../data/category/level_two/menLevelTwo'
import { womenLevelTwo } from '../../../data/category/level_two/womenLevelTwo'
import { menLevelThree } from '../../../data/category/level_three/menLevelThree'
import { womenLevelThree } from '../../../data/category/level_three/womenLevelThree'
import { colors } from '../../../data/Filter/color'
import { mainCategory } from '../../../data/category/mainCategory'
import { electronicsLevelThree } from '../../../data/category/level_three/electronicsLevelThree'
import { electronicsLevelTwo } from '../../../data/category/level_two/electronicsLevelTwo'
import { furnitureLevelThree } from '../../../data/category/level_three/furnitureLevelThree'
import { furnitureLevelTwo } from '../../../data/category/level_two/furnitureLevelTwo'
import { uploadToCloudinary } from '../../../Util/uploadToCloudinary'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { createProduct } from '../../../State/seller/sellerProductSlice'


const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
}

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
}

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Tên sản phẩm không được để trống")
    .min(5, "Tên sản phẩm tối thiểu 5 ký tự")
    .max(200, "Tên sản phẩm tối đa 200 ký tự"),

  description: Yup.string()
    .trim()
    .required("Mô tả sản phẩm không được để trống")
    .min(20, "Mô tả tối thiểu 20 ký tự"),

  mrpPrice: Yup.number()
    .typeError("Giá niêm yết phải là số")
    .required("Vui lòng nhập giá niêm yết")
    .positive("Giá phải lớn hơn 0"),

  sellingPrice: Yup.number()
    .typeError("Giá bán phải là số")
    .required("Vui lòng nhập giá bán")
    .positive("Giá phải lớn hơn 0")
    .max(
      Yup.ref("mrpPrice"),
      "Giá bán không được lớn hơn giá niêm yết"
    ),

  // quantity: Yup.number()
  //   .typeError("Số lượng phải là số")
  //   .required("Vui lòng nhập số lượng")
  //   .integer("Số lượng phải là số nguyên")
  //   .min(1, "Số lượng tối thiểu là 1"),

  color: Yup.string()
    .required("Vui lòng chọn màu sắc"),

  sizes: Yup.array()
    .min(1, 'Chọn ít nhất 1 size')
    .required('Size là bắt buộc'),

  // sizes: Yup.string()
  //   .required("Vui lòng chọn size"),

  // images: Yup.array()
  //   .of(Yup.string().required())
  //   .min(1, "Vui lòng tải lên ít nhất 1 hình ảnh")
  //   .max(5, "Tối đa 5 hình ảnh"),

  category: Yup.string()
    .required("Vui lòng chọn danh mục chính"),

  category2: Yup.string()
    .required("Vui lòng chọn danh mục cấp 2"),

  category3: Yup.string()
    .required("Vui lòng chọn danh mục cấp 3"),
});





const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);

  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const dispatch = useAppDispatch();
  // const { sellers, sellerProduct } = useAppSelector(store => store);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: [] as string[],
    },
    // validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const payload = {
        ...values,
        sizes: values.sizes.join(','),
      };

      console.log(payload);
      dispatch((createProduct({ request: payload, jwt: localStorage.getItem("jwt") })))
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);

    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  }

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      // console.log("Category", parentCategoryId, child);
      return child.parentCategoryId === parentCategoryId;
    });
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const sizes = [{ value: "XS" }, { value: "S" }, { value: "M" }, { value: "L" }, { value: "XL" }, { value: "XXL" }, { value: "XXXL" }];


  return (
    <div>

      <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>

        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type='file'
              accept='image/*'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label className='relative' htmlFor="fileInput">
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                <AddPhotoAlternate className='text-gray-700' />
              </span>

              {
                uploadImage && (
                  <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                )
              }
            </label>

            <div className='flex flex-wrap gap-2'>

              {
                formik.values.images.map((image, index) => (
                  <div className='relative'>

                    <img
                      className='w-24 h-24 object-cover'
                      key={index}
                      src={image}
                      alt={`ProductImage ${index + 1}`}
                    />

                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      className=''
                      size='small'
                      color='error'
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none"

                      }}
                    >
                      <Close sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))
              }

            </div>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id='title'
              name='title'
              label='Tên sản phẩm'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id='description'
              name='description'
              label='Mô tả sản phẩm'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              type='number'
              fullWidth
              id='mrp_price'
              name='mrpPrice'
              label='Giá niêm yết tối đa'
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <TextField
              type='number'
              fullWidth
              id='sellingPrice'
              name='sellingPrice'
              label='Giá bán'
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Màu sắc</InputLabel>

              <Select
                labelId='color-label'
                id='color'
                name='color'
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Màu sắc"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {
                  colors.map((color, index) => <MenuItem value={color.name}>
                    <div className='flex gap-3'>

                      <span style={{ backgroundColor: color.hex }} className={`h-5 w-5 rounded-full
                        ${color.name === "White" ? "border" : ""}`}></span>

                      <p>{color.name}</p>
                    </div>
                  </MenuItem>)
                }
              </Select>
              {
                formik.touched.color && formik.errors.color && (
                  <FormHelperText>{formik.errors.color}</FormHelperText>
                )
              }
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
            // required
            >
              <InputLabel id="sizes-label">Size</InputLabel>

              <Select
                labelId='sizes-label'
                id='sizes'
                name='sizes'
                multiple
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Size"
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}

                {
                  sizes.map((size, index) => <MenuItem value={size.value}>
                    <div className='flex gap-3'>
                      <p>{size.value}</p>
                    </div>
                  </MenuItem>)
                }
              </Select>
              {
                formik.touched.sizes && formik.errors.sizes && (
                  <FormHelperText>{formik.errors.sizes}</FormHelperText>
                )
              }
            </FormControl>
          </Grid>


          {/* Category */}
          {/* CATEGORY LEVEL 1 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl
              fullWidth
              required
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <InputLabel id="category-label">Danh mục chính</InputLabel>

              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                label="Danh mục chính"
                onChange={(e) => {
                  formik.setFieldValue("category", e.target.value);
                  formik.setFieldValue("category2", "");
                  formik.setFieldValue("category3", "");
                }}
              >
                <MenuItem value="">
                  <em>Chọn danh mục</em>
                </MenuItem>

                {mainCategory.map((cat: any) => (
                  <MenuItem key={cat.id} value={cat.categoryId}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>

              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* CATEGORY LEVEL 2 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl
              fullWidth
              required
              disabled={!formik.values.category}
              error={formik.touched.category2 && Boolean(formik.errors.category2)}
            >
              <InputLabel id="category2-label">Danh mục cấp 2</InputLabel>

              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                label="Danh mục cấp 2"
                onChange={(e) => {
                  formik.setFieldValue("category2", e.target.value);
                  formik.setFieldValue("category3", "");
                }}
              >
                <MenuItem value="">
                  <em>Chọn danh mục</em>
                </MenuItem>

                {formik.values.category &&
                  childCategory(
                    categoryTwo[formik.values.category] || [],
                    formik.values.category
                  ).map((cat: any) => (
                    <MenuItem key={cat.id} value={cat.categoryId}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>

              {formik.touched.category2 && formik.errors.category2 && (
                <FormHelperText>{formik.errors.category2}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* CATEGORY LEVEL 3 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl
              fullWidth
              required
              disabled={!formik.values.category2}
              error={formik.touched.category3 && Boolean(formik.errors.category3)}
            >
              <InputLabel id="category3-label">Danh mục cấp 3</InputLabel>

              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                value={formik.values.category3}
                label="Danh mục cấp 3"
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Chọn danh mục</em>
                </MenuItem>

                {formik.values.category &&
                  childCategory(
                    categoryThree[formik.values.category] || [],
                    formik.values.category2
                  ).map((cat: any) => (
                    <MenuItem key={cat.id} value={cat.categoryId}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>

              {formik.touched.category3 && formik.errors.category3 && (
                <FormHelperText>{formik.errors.category3}</FormHelperText>
              )}
            </FormControl>
          </Grid>




          {/* Button */}
          <Grid size={{ xs: 12 }}>

            <Button
              sx={{ p: "14px" }}
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
            // onClick={() => console.log("CLICK SUBMIT")}
            // disabled={sellerProduct.loading}

            >
              {/* {sellerProduct.loading */}
              {false ? <CircularProgress size='small'
                sx={{ width: "27px", height: "27px" }}
              /> : "Thêm sản phẩm"
              }

            </Button>

          </Grid>
        </Grid>

      </form>

      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen} autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerProduct.error ? "error" : "success"}
          variant='filled'
          sx={{ width: '100%' }}
        >

          {sellerProduct.error ? sellerProduct.error : "Product created successfully"}

        </Alert>

      </Snackbar> */}

    </div>
  )
}

export default AddProduct
