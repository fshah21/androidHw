package com.example.myapplication;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import org.w3c.dom.Text;

public class NewsHolder extends RecyclerView.ViewHolder
{
    static ImageView newsImageView;
    static TextView titleView, descView;

    public NewsHolder(@NonNull View itemView) {
        super(itemView);

        this.newsImageView = itemView.findViewById(R.id.newsImage);
        this.titleView = itemView.findViewById(R.id.newsTitle);
        this.descView = itemView.findViewById(R.id.newsDescription);
    }
}
