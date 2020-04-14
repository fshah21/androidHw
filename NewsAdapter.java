package com.example.myapplication;

import android.content.Context;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class NewsAdapter extends RecyclerView.Adapter<NewsHolder>
{
    Context c;
    ArrayList<NewsCard> newsCards;

    public NewsAdapter(Context c, ArrayList<NewsCard> newsCards) {
        this.c = c;
        this.newsCards = newsCards;
    }

    @NonNull
    @Override
    public NewsHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.row, parent, false);
        return new NewsHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NewsHolder holder, int position) {

        Picasso.get().load(newsCards.get(position).getImg()).into(NewsHolder.newsImageView);
        NewsHolder.titleView.setText(newsCards.get(position).getTitle());
        NewsHolder.descView.setText(newsCards.get(position).getDescription());
    }

    @Override
    public int getItemCount() {
        return newsCards.size();
    }
}
