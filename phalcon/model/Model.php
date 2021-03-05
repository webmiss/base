<?php
namespace model;

use Base\Base;
use Config\Db;

/* 数据库 */
class Model extends Base {

  private static $conn = null;    //连接
  private static $sql = '';       //SQL
  private static $table = '';     //数据表
  private static $columns = '';   //字段
  private static $where = '';     //条件
  private static $group = '';     //分组
  private static $order = '';     //排序
  private static $limit = '';     //限制
  private static $args = [];      //参数
  private static $keys = '';      //新增-名
  private static $values = '';    //新增-值
  private static $data = '';      //更新-数据

  /* 链接数据库 */
  static function Conn(): object {
    if(self::$conn) return self::$conn;
    // 参数
    $params = [
      'host'=> Db::$Host,
      'port'=> Db::$Port,
      'username'=> Db::$User,
      'password'=> Db::$Password,
      'dbname'=> Db::$Database,
      'charset'=> Db::$Charset,
      'persistent'=> Db::$Persistent,
    ];
    // 删除编码
    if (Db::$Driver == 'Postgresql') unset($params['charset']);
    // 命名空间
    $class = 'Phalcon\Db\Adapter\Pdo\\'.Db::$Driver;
    self::$conn = new $class($params);
    return self::$conn;
  }

  /* 查询 */
  static function Query(string $sql, array $args=[]) {
    if(empty($sql)){
      self::print('[Model] Query: SQL不能为空!');
      return null;
    }
    self::Conn();
    
    return self::$conn->query($sql, $args);
  }

  /* 获取-SQL */
  static function GetSql() : string {
    return self::$sql;
  }

  /* 表 */
  static function Table(string $table): void {
    self::$table = $table;
  }
  /* 关联-INNER */
  static function Join(string $table, string $on): void {
    self::$table += " INNER JOIN " + $table + " ON " + $on;
  }
  /* 关联-LEFT */
  static function LeftJoin(string $table, string $on): void {
    self::$table += " LEFT JOIN " + $table + " ON " + $on;
  }
  /* 关联-RIGHT */
  static function RightJoin(string $table, string $on): void {
    self::$table += " RIGHT JOIN " + $table + " ON " + $on;
  }
  /* 关联-FULL */
  static function FullJoin(string $table, string $on): void {
    self::$table += " FULL JOIN " + $table + " ON " + $on;
  }
  /* 字段 */
  static function Columns(...$columns): void {
    self::$columns = implode(',', $columns);
  }
  /* 条件 */
  static function Where(string $where, ...$values): void {
    self::$where = $where;
    self::$args = array_merge(self::$args, $values);
  }
  /* 限制 */
  static function Limit(int $start, int $limit): void {
    self::$limit = $start+','+$limit;
  }
  /* 排序 */
  static function Order(...$order): void {
    self::$order = implode(',', $order);
  }
  /* 分组 */
  static function Group(...$group): void {
    self::$group = implode(',', $group);
  }

  /* 分页 */
  static function Page(int $page, int $limit): void {
    $start = ($page - 1) * $limit;
    self::$limit = $start + ',' + $limit;
  }

  /* 查询-SQL */
  static function SelectSql(): ?array {
    if(self::$table=='' || self::$columns==''){
      self::print('Model[Select]: 数据表、字段不能为空!');
      return null;
    }
    // 合成
    self::$sql = 'SELECT '.self::$columns.' FROM '.self::$table;
    if(self::$where != ''){
      self::$sql .= ' WHERE '.self::$where;
    }
    if(self::$order != ''){
      self::$sql .= ' ORDER BY '.self::$order;
    }
    if(self::$group != ''){
      self::$sql .= ' GROUP BY '.self::$group;
    }
    if(self::$limit != ''){
      self::$sql .= ' LIMIT '.self::$limit;
    }
    return [self::$sql, self::$args];
  }

  /* 查询-多条 */
  static function Find(): ?array {
    list($sql, $args) = self::SelectSql();
    $res = self::Query($sql, $args);
    return $res?$res->fetchAll():null;
  }

}