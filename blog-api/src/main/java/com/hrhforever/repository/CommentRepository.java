package com.hrhforever.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrhforever.entity.Article;
import com.hrhforever.entity.Comment;

/**
 * @author hrhforever
 * <p>
 * 2018年1月25日
 */
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByArticleAndLevelOrderByCreateDateDesc(Article a, String level);


}
