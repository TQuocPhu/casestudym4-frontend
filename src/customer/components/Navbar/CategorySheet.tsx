import React from 'react'
import { menLevelTwo } from '../../../data/category/level_two/menLevelTwo'
import { womenLevelTwo } from '../../../data/category/level_two/womenLevelTwo'
import { menLevelThree } from '../../../data/category/level_three/menLevelThree'
import { womenLevelThree } from '../../../data/category/level_three/womenLevelThree'
import { Box } from '@mui/material'
import { furnitureLevelTwo } from '../../../data/category/level_two/furnitureLevelTwo'
import { furnitureLevelThree } from '../../../data/category/level_three/furnitureLevelThree'
import { electronicsLevelTwo } from '../../../data/category/level_two/electronicsLevelTwo'
import { electronicsLevelThree } from '../../../data/category/level_three/electronicsLevelThree'
import { useNavigate } from 'react-router-dom'

const categoryTwo: { [key: string]: any } = {
    men: menLevelTwo,
    women: womenLevelTwo,
    home_furniture: furnitureLevelTwo,
    electronics: electronicsLevelTwo,

}

const categoryThree: { [key: string]: any } = {
    men: menLevelThree,
    women: womenLevelThree,
    home_furniture: furnitureLevelThree,
    electronics: electronicsLevelThree,
}

const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {
    const navigate = useNavigate();

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId === parentCategoryId)
    }
    return (
        <Box sx={
            { zIndex: 1 }
        } className="bg-white shadow-lg lg:h-[350px] overflow-auto">
            <div className='flex text-sm flex-wrap justify-around'>

                {
                    categoryTwo[selectedCategory]?.map((item: any, index: number) =>
                        <div className={`p-8 lg:w-[20%] ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                            <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>
                            <ul className='space-y-3'>

                                {childCategory(categoryThree[selectedCategory], item.categoryId).map((item: any) =>
                                    <div>
                                        <li onClick={() => navigate("/products/" + item.categoryId)} className='hover:text-primary-color cursor-pointer'>
                                            {item.name}
                                        </li>
                                    </div>
                                )}


                            </ul>
                        </div>
                    )
                }

            </div>
        </Box>
    )
}

export default CategorySheet
