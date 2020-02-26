package com.hrhforever.dao;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.hrhforever.BlogApiApplicationTests;
import com.hrhforever.repository.CategoryRepository;

public class CategoryRepositoryTest extends BlogApiApplicationTests{

	@Autowired
	private CategoryRepository	categoryRepository;

	@Test
	public void test() {
	}
}
