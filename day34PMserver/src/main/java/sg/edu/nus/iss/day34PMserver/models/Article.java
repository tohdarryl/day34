package sg.edu.nus.iss.day34PMserver.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private String title;
    private String author;
    private String description;
    private String urlToImage;
    private String url;



public JsonObject toJson(){
    return Json.createObjectBuilder()
            .add("author", author)
            .add("title", title)
            .add("description", description)
            .add("urlToImage", urlToImage)
            .add("url", url)
            .build();
}

public static Article toArticle(JsonObject obj){
    Article article = new Article();
    article.setAuthor(getValue("author", obj));
    article.setTitle(obj.getString("title"));
    article.setDescription(getValue("description", obj));
    article.setUrlToImage(getValue("urlToImage", obj));
    article.setUrl(getValue("url", obj));
    return article;
}
// if value is null, return "not value"
private static String getValue(String fn, JsonObject o) {

    if (o.containsKey(fn) && !o.isNull(fn))
        return o.getString(fn);
    return "not value";
}

}
