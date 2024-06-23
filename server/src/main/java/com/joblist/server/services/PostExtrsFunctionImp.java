package com.joblist.server.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.joblist.server.model.Post;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;

@Component
public class PostExtrsFunctionImp implements PostExtraFunctions {
    @Autowired
    MongoClient client;

    @Autowired
    MongoConverter converter;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<Post> findByText(String text) {

        final List<Post> posts=new ArrayList<>();
        MongoDatabase database = client.getDatabase("JobPortal");
        MongoCollection<Document> collection = database.getCollection("JobPost");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search", 
                new Document("index", "default")
                .append("text", 
                new Document("query", text)
                .append("path", Arrays.asList("desc", "techs", "profile")))), 
                new Document("$sort", 
                new Document("exp", 1L)), 
                new Document("$limit", 5L)));

        result.forEach(doc->posts.add(converter.read(Post.class, doc)));
        return posts;
    }

    @Override
    public void updateByNo(int no,Post post){
        Query query = new Query(Criteria.where("no").is(no));
        Update update=new Update();

        update.set("profile", post.getProfile());
        update.set("exp", post.getExp());
        update.set("desc", post.getDesc());
        update.set("techs", post.getTechs());

        UpdateResult res=mongoTemplate.updateFirst(query, update, Post.class);
    }
}
