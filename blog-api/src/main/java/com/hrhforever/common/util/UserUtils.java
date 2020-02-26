package com.hrhforever.common.util;

import org.apache.shiro.SecurityUtils;

import com.hrhforever.common.constant.Base;
import com.hrhforever.entity.User;

/**
 * @author hrhforever
 * <p>
 * 2018年1月25日
 */
public class UserUtils {

    public static User getCurrentUser() {
        User user = (User) SecurityUtils.getSubject().getSession().getAttribute(Base.CURRENT_USER);
        return user;
    }
}
