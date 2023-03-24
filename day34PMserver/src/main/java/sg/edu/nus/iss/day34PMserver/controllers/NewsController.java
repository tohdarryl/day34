package sg.edu.nus.iss.day34PMserver.controllers;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import sg.edu.nus.iss.day34PMserver.models.Article;
import sg.edu.nus.iss.day34PMserver.services.NewsService;

@Controller
@CrossOrigin(origins = "*") // to allow CORS
@RequestMapping(path="api", produces=MediaType.APPLICATION_JSON_VALUE)
public class NewsController {
    
    private Logger logger = Logger.getLogger(NewsController.class.getName());

    @Autowired
    NewsService newsSvc;

    @GetMapping(path="/news/{country}/{category}")
    @ResponseBody
    public ResponseEntity<String> getNews (@PathVariable String country, 
                                            @PathVariable String category, 
                                            @RequestParam(defaultValue = "10") int pageSize){
    
    logger.log(Level.INFO, "country=%s, category=%s".formatted(country, category));

    List<Article> articles = newsSvc.getNews(country, category, pageSize);

    // Array builder as its an array of Article object
    JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
    articles.stream()
            .forEach(v -> {
                arrBuilder.add(v.toJson());
            });
    
    // Use JsonObject builder to include "articles" for the object to allow Angular to pick up
    JsonObject articleObj = Json.createObjectBuilder()
    .add("articles", arrBuilder.build())
    .build();
   

    return ResponseEntity.ok(articleObj.toString());
    }
}
