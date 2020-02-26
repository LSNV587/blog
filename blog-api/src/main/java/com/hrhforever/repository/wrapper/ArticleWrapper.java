package com.hrhforever.repository.wrapper;

import com.hrhforever.entity.Article;
import com.hrhforever.vo.ArticleVo;
import com.hrhforever.vo.PageVo;

import java.util.List;

public interface ArticleWrapper {
    List<Article> listArticles(PageVo page);

    List<Article> listArticles(ArticleVo article, PageVo page);

    List<ArticleVo> listArchives();

}
