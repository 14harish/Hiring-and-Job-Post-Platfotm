package com.joblist.server.services;

import java.util.List;

import com.joblist.server.model.Post;

public interface SearchRepository {

    List<Post> findByText(String str);
}
