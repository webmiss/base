package webmis.middleware;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/* 允许跨域请求 */
@Configuration
public class Cors {

    /* 规则 */
    public CorsConfiguration buildConfig() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.addAllowedOrigin("*"); //域名
        cors.addAllowedMethod("*"); //请求方式
        cors.addAllowedHeader("*"); //预检响应
        cors.setMaxAge((long) 2592000); //OPTIONS(30天)
        return cors;
    }
 
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // source.registerCorsConfiguration("/admin/**", buildConfig());
        // source.registerCorsConfiguration("/api/**", buildConfig());
        source.registerCorsConfiguration("/**", buildConfig());
        return new CorsFilter(source);
    }
}
