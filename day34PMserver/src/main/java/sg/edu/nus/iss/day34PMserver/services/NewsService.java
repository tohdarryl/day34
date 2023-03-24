package sg.edu.nus.iss.day34PMserver.services;

import java.io.StringReader;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import sg.edu.nus.iss.day34PMserver.models.Article;

@Service
public class NewsService {
    
    public static final String NEWS_API="https://newsapi.org/v2/top-headlines";
    // public static final String newsKey="take API from website";

    @Value("${news.key}")
    private String newsKey;

    public List<Article> getNews(String country, String category, int pageSize){
        
        // requestparam to query from api   
        String url = UriComponentsBuilder.fromUriString(NEWS_API)
                .queryParam("country", country)
                .queryParam("category", category)
                .queryParam("pageSize", pageSize)
                .queryParam("apiKey", newsKey)
                .toUriString();
            
        RequestEntity<Void> req = RequestEntity.get(url)
                .accept(MediaType.APPLICATION_JSON)
                .build();

        // resttemplate to get info from api
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = null;

        try {
            // exchange: sends request to api, in return for response
            resp =  template.exchange(req, String.class);
        } catch (Exception ex) {
            ex.printStackTrace();
            return Collections.EMPTY_LIST;
        }

        String payload = resp.getBody();
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject newResp = reader.readObject();
        JsonArray jsonArr = newResp.getJsonArray("articles");

        
        return jsonArr.stream()
                .map(v -> v.asJsonObject())
                .map(Article::toArticle)
                .toList();
        
    }
}
