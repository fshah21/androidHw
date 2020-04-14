package com.example.myapplication;

public class NewsCard
{
    private String title, description, img;

    public NewsCard(String title, String description, String img){
        this.title = title;
        this.description = description;
        this.img = img;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImg() {
        return img;
    }
}
