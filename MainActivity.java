package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.Manifest;
import android.animation.TimeAnimator;
import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Criteria;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.SearchView;
import android.widget.TextView;
import android.widget.Toast;


import android.location.LocationListener;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MainActivity extends AppCompatActivity implements LocationListener, BottomNavigationView.OnNavigationItemSelectedListener{

    private static final int REQUEST_CODE_ASK_PERMISSIONS = 123;
    private double latitude = 0.00;
    private double longitude = 0.00;
    private RequestQueue queue;
    private int temp;
    private String summary;
    RecyclerView newsRecyclerView;
    NewsAdapter newsAdapter;
    ArrayList<NewsCard> newsCards = new ArrayList<NewsCard>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (Build.VERSION.SDK_INT >= 23) {
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) !=
                    PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{
                                Manifest.permission.ACCESS_FINE_LOCATION},
                        REQUEST_CODE_ASK_PERMISSIONS);
                return;
            }
        }

        getLocation();
        BottomNavigationView navigationView = (BottomNavigationView) findViewById(R.id.bottom_navigation);
        navigationView.setOnNavigationItemSelectedListener(this);
        Geocoder geocoder = new Geocoder(this, Locale.getDefault());
        List<Address> addresses;
        try
        {
            addresses = geocoder.getFromLocation(latitude, longitude, 1);
            String cityName = addresses.get(0).getLocality();
            String stateName = addresses.get(0).getAdminArea();
            TextView city_text_view = findViewById(R.id.city_name);
            city_text_view.setText(cityName);
            TextView state_text_view = findViewById(R.id.state_name);
            state_text_view.setText(stateName);
            //https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=8a1e9aff0ba397d782127ba17048bd3d
            queue = Volley.newRequestQueue(this);
            String url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=8a1e9aff0ba397d782127ba17048bd3d";
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest
                    (Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

                        @Override
                        public void onResponse(JSONObject response) {
                            String data = response.toString();
                            String temperature;
                            String summary;
                            try
                            {
                                JSONObject reader = new JSONObject(data);
                                JSONObject main = reader.getJSONObject("main");
                                temperature = main.getString("temp");
                                double temp_value = Double.valueOf(temperature);
                                int final_temp = (int) Math.round(temp_value);
                                String degree = "" + (char)186 + "C";
                                String final_temp_string = Integer.toString(final_temp) + degree;
                                TextView temp_text_view = (TextView) findViewById(R.id.temperature);
                                temp_text_view.setText(final_temp_string);
                                JSONArray weather = reader.getJSONArray("weather");
                                JSONObject array = weather.getJSONObject(0);
                                summary = array.getString("main");
                                TextView summary_text_view = (TextView) findViewById(R.id.summary);
                                summary_text_view.setText(summary);
                                CardView card = (CardView) findViewById(R.id.weather_card);
                                if(summary.equals("clouds"))
                                {
                                    card.setBackgroundResource(R.drawable.cloudy);
                                }
                                else if(summary.equals("rain") || summary.equals("drizzle"))
                                {
                                    card.setBackgroundResource(R.drawable.rain);
                                }
                                else if(summary.equals("clear"))
                                {
                                    card.setBackgroundResource(R.drawable.clear);
                                }
                                else if(summary.equals("snow"))
                                {
                                    card.setBackgroundResource(R.drawable.snow);
                                }
                                else if(summary.equals("thunderstorm"))
                                {
                                    card.setBackgroundResource(R.drawable.thunderstorm);
                                }
                                else {
                                    card.setBackgroundResource(R.drawable.sunny);
                                }
                            }
                            catch (JSONException e)
                            {
                                e.printStackTrace();
                            }
                        }
                    }, new Response.ErrorListener() {

                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // TODO: Handle error

                        }
                    });

// Access the RequestQueue through your singleton class
            queue.add(jsonObjectRequest);


        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        getNewsList();
        //newsAdapter.notifyDataSetChanged();
    }

    private void getNewsList() {
        final ArrayList<String> newsImages = new ArrayList<>();
        final ArrayList<String> newsTitles = new ArrayList<>();
        final ArrayList<String> newsDates = new ArrayList<>();
        final ArrayList<String> newsSections = new ArrayList<>();
        final ArrayList<String> newsIds = new ArrayList<>();
        RequestQueue queue2 = Volley.newRequestQueue(MainActivity.this);
        String home_url = "https://androidbackend-274200.ue.r.appspot.fcascom/latestguardian";
        JsonArrayRequest homeRequest = new JsonArrayRequest(Request.Method.GET, home_url, null,
                new Response.Listener<JSONArray>()
                {
                    @Override
                    public void onResponse(JSONArray response) {
                        // display response
                        int response_length = response.length();
                        for(int i = 0; i < response_length; i++){
                            try {
                                JSONArray array = response.getJSONArray(i);
                                newsImages.add(array.get(0).toString());
                                newsTitles.add(array.get(1).toString());
                                String webPublicationDate = array.get(2).toString();
                                ZoneId zone = ZoneId.of("America/Los_Angeles");
                                ZonedDateTime zonedDateTime = ZonedDateTime.now(zone);
                                int zonedHour = zonedDateTime.getHour();
                                int zonedMin = zonedDateTime.getMinute();
                                int zonedSec = zonedDateTime.getSecond();
                                String[] splitTime = webPublicationDate.split("T");
                                String webDateTime = splitTime[1];
                                webDateTime = webDateTime.substring(0, webDateTime.length()-1);
                                String[] timeDis = webDateTime.split(":");
                                int localHour = Integer.parseInt(timeDis[0]);
                                int localMin = Integer.parseInt(timeDis[1]);
                                int localSec = Integer.parseInt(timeDis[2]);
                                int hourDiff = Math.abs(localHour - zonedHour);
                                int minDiff = Math.abs(localMin - zonedMin);
                                int secDiff = Math.abs(localSec - zonedSec);
                                if(hourDiff > 1){
                                    newsSections.add(hourDiff +" h ago | "+array.get(3).toString());
                                }
                                else if(minDiff > 1){
                                    newsSections.add(minDiff +" m ago | "+array.get(3).toString());

                                }
                                else {
                                    newsSections.add(secDiff + " s ago | " + array.get(3).toString());

                                }
                                newsIds.add(array.get(4).toString());
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                        for(int i = 0; i < response_length; i++) {
                            NewsCard n = new NewsCard(newsTitles.get(i), newsSections.get(i), newsImages.get(i));
                            newsCards.add(n);
                        }
                        newsRecyclerView = findViewById(R.id.recycler_view);
                        newsAdapter = new NewsAdapter(MainActivity.this, newsCards);
                        newsRecyclerView.setAdapter(newsAdapter);
                        newsRecyclerView.setLayoutManager(new LinearLayoutManager(MainActivity.this));
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", error.toString());
                        Toast.makeText(MainActivity.this, "ERROR :"+error.toString(), Toast.LENGTH_SHORT).show();
                    }
                }
        );
// Access the RequestQueue through your singleton class
        queue2.add(homeRequest);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.my_menu, menu);
        SearchManager searchManager =
                (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        SearchView searchView =
                (SearchView) menu.findItem(R.id.search_icon).getActionView();
        searchView.setSearchableInfo(
                searchManager.getSearchableInfo(getComponentName()));
        return true;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case REQUEST_CODE_ASK_PERMISSIONS:
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    getLocation();
                } else {
                    // Permission Denied
                    Toast.makeText(this, "your message", Toast.LENGTH_SHORT)
                            .show();
                }
                break;
            default:
                super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    //Get location
    public void getLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        else{
            LocationManager locationManager = (LocationManager)  this.getSystemService(Context.LOCATION_SERVICE);
            Criteria criteria = new Criteria();
            String bestProvider = String.valueOf(locationManager.getBestProvider(criteria, true)).toString();

            Location location = locationManager.getLastKnownLocation(bestProvider);
            if (location != null) {
                latitude = location.getLatitude();
                longitude = location.getLongitude();
            }
            else{
                locationManager.requestLocationUpdates(bestProvider, 1000, 0, this);
            }
        }
    }

    @Override
    public void onLocationChanged(Location location) {

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.action_home:
                    //Toast.makeText(MainActivity.this, "Home", Toast.LENGTH_SHORT).show();
                    break;
                case R.id.action_headlines:
                    Intent i = new Intent(this, HeadlineActivity.class);
                    startActivity(i);
                    break;
                case R.id.action_trending:
                    //Toast.makeText(MainActivity.this, "Trending", Toast.LENGTH_SHORT).show();
                    break;
                case R.id.action_bookmarks:
                    //Toast.makeText(MainActivity.this, "Bookmarks", Toast.LENGTH_SHORT).show();
                    break;
            }
            return true;
        }

}