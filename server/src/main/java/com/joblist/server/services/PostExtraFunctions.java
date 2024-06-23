package com.joblist.server.services;

import java.util.List;

import com.joblist.server.model.Post;

public interface PostExtraFunctions {
    
    List<Post> findByText(String str);
    void updateByNo(int no,Post post);
}
