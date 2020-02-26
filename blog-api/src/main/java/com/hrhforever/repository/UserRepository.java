package com.hrhforever.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hrhforever.entity.User;

/**
 * @author hrhforever
 * <p>
 * 2018年1月23日
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByAccount(String account);

}
