package webmis.util;

/* 泛型 */
public class Dynamic<T> {
  private T key;
  public Dynamic(T key) {
    this.key = key;
  }
  public T getKey(){
    return key;
  }
}
