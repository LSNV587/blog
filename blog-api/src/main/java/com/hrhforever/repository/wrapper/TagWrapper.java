package com.hrhforever.repository.wrapper;

import java.util.List;

import com.hrhforever.vo.TagVO;

/**
 * @author hrhforever
 * <p>
 * 2018年1月25日
 */
public interface TagWrapper {

    List<TagVO> findAllDetail();

    TagVO getTagDetail(Integer tagId);
}
