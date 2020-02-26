package com.hrhforever.repository.wrapper;

import java.util.List;

import com.hrhforever.vo.CategoryVO;

/**
 * @author hrhforever
 * <p>
 * 2018年1月25日
 */
public interface CategoryWrapper {

    List<CategoryVO> findAllDetail();

    CategoryVO getCategoryDetail(Integer categoryId);
}
