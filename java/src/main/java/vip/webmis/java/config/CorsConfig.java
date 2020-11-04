package vip.webmis.java.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    private CorsConfiguration buildConfig() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.addAllowedOrigin("*"); // 允许域名
        cors.addAllowedHeader("*"); // 允许任何头
        cors.addAllowedMethod("*"); // 允许请求方式
        return cors;
    }
 
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/admin/**", buildConfig());
        source.registerCorsConfiguration("/api/**", buildConfig());
        return new CorsFilter(source);
    }
}
