<?php
namespace Model;

use Service\Base;
use Config\Db;

/* 数据库 */
class Model extends Base {

  static $DBDefault = null;      //默认池
  static $DBOther = null;        //其它池

  private $conn = null;          //连接
  private $sql = '';             //SQL
  private $db = '';              //数据库
  private $table = '';           //数据表
  private $columns = '';         //字段
  private $where = '';           //条件
  private $group = '';           //分组
  private $order = '';           //排序
  private $limit = '';           //限制
  private $args = [];            //参数
  private $keys = '';            //新增-名
  private $values = '';          //新增-值
  private $data = '';            //更新-数据
  private $id = 0;               //自增ID
  private $nums = 0;             //条数

  /* 连接池 */
  function DBPool() {
    // 配置
    if($this->db=='other') $cfg = Db::Other();
    else $cfg = Db::Default();
    // Postgresql
    if ($cfg['driver'] == 'Postgresql') unset($params['charset']);
    // 命名空间
    $class = 'Phalcon\Db\Adapter\Pdo\\'.$cfg['driver'];
    unset($cfg['driver']);
    try {
      return new $class($cfg);
    }catch (\Exception $e){
      self::Print('[Model] Pool:', $e->getMessage());
      return null;
    }
  }

  /* 连接 */
  function DBConn() {
    if($this->db=='other'){
      if(!Model::$DBOther) Model::$DBOther=$this->DBPool();
      $this->conn = self::$DBOther;
    } else {     
      if(!Model::$DBDefault) Model::$DBDefault=$this->DBPool();
      $this->conn = self::$DBDefault;
    }
    return $this->conn;
  }

  /* 查询 */
  function Query(string $sql, array $args=[]) {
    if(empty($sql)){
      $this->Print('[Model] Query: SQL不能为空!');
      return null;
    }
    try {
      $this->DBConn();
      return $this->conn->query($sql, $args);
    }catch (\Exception $e){
      $this->Print('[Model] Query:', $e->getMessage());
      $this->Print('[Model] SQL:', $sql);
      return null;
    }
  }

  /* 执行 */
  function Exec(string $sql, array $args=[]) {
    if(empty($sql)){
      $this->Print('[Model] Exec: SQL不能为空!');
      return null;
    }
    try {
      $this->DBConn();
      return $this->conn->execute($sql, $args);
    }catch (\Exception $e){
      $this->Print('[Model] Exec:', $e->getMessage());
      $this->Print('[Model] SQL:', $sql);
      return null;
    }
  }

  /* 获取-SQL */
  function GetSql() : string {
    return $this->sql;
  }
  /* 获取-自增ID */
  function GetID() : int {
    return $this->id;
  }
  /* 获取-条数 */
  function GetNums() : int {
    return $this->nums;
  }

  /* 数据库 */
  function Db(string $db): void {
    $this->db = $db;
  }
  /* 表 */
  function Table(string $table): void {
    $this->table = $table;
  }
  /* 关联-INNER */
  function Join(string $table, string $on): void {
    $this->table .= ' INNER JOIN ' . $table . ' ON ' . $on;
  }
  /* 关联-LEFT */
  function LeftJoin(string $table, string $on): void {
    $this->table .= ' LEFT JOIN ' . $table . ' ON ' . $on;
  }
  /* 关联-RIGHT */
  function RightJoin(string $table, string $on): void {
    $this->table .= ' RIGHT JOIN ' . $table . ' ON ' . $on;
  }
  /* 关联-FULL */
  function FullJoin(string $table, string $on): void {
    $this->table .= ' FULL JOIN ' . $table . ' ON ' . $on;
  }
  /* 字段 */
  function Columns(...$columns): void {
    $this->columns = implode(',', $columns);
  }
  /* 条件 */
  function Where(string $where, ...$values): void {
    $this->where = $where;
    $this->args = array_merge($this->args, $values);
  }
  /* 限制 */
  function Limit(int $start, int $limit): void {
    $this->limit = $start.','.$limit;
  }
  /* 排序 */
  function Order(...$order): void {
    $this->order = implode(',', $order);
  }
  /* 分组 */
  function Group(...$group): void {
    $this->group = implode(',', $group);
  }

  /* 分页 */
  function Page(int $page, int $limit): void {
    $start = ($page - 1) * $limit;
    $this->limit = $start . ',' . $limit;
  }

  /* 查询-SQL */
  function SelectSql(): array {
    if($this->table==''){
      $this->Print('Model[Select]: 表不能为空!');
      return ['', $this->args];
    }
    if($this->columns==''){
      $this->Print('Model[Select]: 字段不能为空!');
      return ['', $this->args];
    }
    // 合成
    $this->sql = 'SELECT '.$this->columns.' FROM '.$this->table;
    if($this->where != ''){
      $this->sql .= ' WHERE '.$this->where;
      $this->where = '';
    }
    if($this->order != ''){
      $this->sql .= ' ORDER BY '.$this->order;
      $this->order = '';
    }
    if($this->group != ''){
      $this->sql .= ' GROUP BY '.$this->group;
      $this->group = '';
    }
    if($this->limit != ''){
      $this->sql .= ' LIMIT '.$this->limit;
      $this->limit = '';
    }
    $args = $this->args;
    $this->args = [];
    return [$this->sql, $args];
  }
  /* 查询-多条 */
  function Find(): array {
    $res = [];
    list($sql, $args) = $this->SelectSql();
    if(empty($sql)) return $res;
    $this->DBConn();
    $res = $this->conn->fetchAll($sql, 2, $args);
    return $res?$res:[];
  }
  /* 查询-单条 */
  function FindFirst(): array {
    $res = [];
    $this->limit = '0,1';
    list($sql, $args) = $this->SelectSql();
    if(empty($sql)) return $res;
    $this->DBConn();
    $res = $this->conn->fetchOne($sql, 2, $args);
    return $res?$res:[];
  }

  /* 添加-数据 */
  function Values(array $data) {
    list($keys, $vals) = ['', ''];
    $this->args = [];
    foreach($data as $k=>$v){
      $keys .= $k.', ';
		  $vals .= '?, ';
      $this->args[] = $v;
    }
    $this->keys = !empty($keys)?rtrim($keys, ', '):'';
    $this->values = !empty($vals)?rtrim($vals, ', '):'';
  }
  /* 添加-SQL */
  function InsertSql(): ?array {
    if($this->table==''){
      $this->Print('[Model] Insert: 表不能为空!');
      return ['',$this->args];
    }
    if($this->keys=='' || $this->values==''){
      $this->Print('[Model] Insert: 数据不能为空!');
      return ['',$this->args];
    }
    $this->sql = 'INSERT INTO `' . $this->table . '`(' . $this->keys . ') values(' . $this->values . ')';
    $args = $this->args;
    // 重置
    $this->keys = '';
    $this->values = '';
    $this->args = [];
    return [$this->sql, $args];
  }
  /* 添加-执行 */
  function Insert(): bool {
    list($sql, $args) = $this->InsertSql();
    if(empty($sql)) return false;
    $res = $this->Exec($sql, $args);
    if($res){
       $this->id = $this->conn->lastInsertId();
      return true;
    }
    return false;
  }

  /* 更新-数据 */
  function Set(array $data = []): void {
    $vals = '';
    $this->args = [];
    foreach($data as $k=>$v){
      $vals .= $k . '=?, ';
      $this->args[] = $v;
    }
    $this->data = !empty($vals)?rtrim($vals, ', '):'';
  }
  /* 更新-SQL */
  function UpdateSql(): array {
    if($this->table == ''){
      $this->Print('[Model] Update: 表不能为空!');
      return ['', null];
    }
    if($this->data == ''){
      $this->Print('[Model] Update: 数据不能为空!');
      return ['', null];
    }
    if($this->where == ''){
      $this->Print('[Model] Update: 条件不能为空!');
      return ['', null];
    }
    $this->sql = 'UPDATE ' . $this->table . ' SET ' . $this->data . ' WHERE ' . $this->where;
    $args = $this->args;
    // 重置
    $this->data = '';
    $this->where = '';
    $this->args = [];
    return [$this->sql, $args];
  }
  /* 更新-执行 */
  function Update(): bool {
    list($sql, $args) = $this->UpdateSql();
    if(empty($sql)) return false;
    $res = $this->Exec($sql, $args);
    if($res){
      $this->nums = $this->conn->affectedRows();
      return true;
    }
    return false;
  }

  /* 删除-SQL */
  function DeleteSql(): array {
    if($this->table == ''){
      $this->Print('[Model] Delete: 表不能为空!');
      return ['', null];
    }
    if($this->where == ''){
      $this->Print('[Model] Delete: 条件不能为空!');
      return ['', null];
    }
    $this->sql = 'DELETE FROM `' . $this->table . '` WHERE ' . $this->where;
    $args = $this->args;
    // 重置
    $this->where = '';
    $this->args = [];
    return [$this->sql, $args];
  }

  /* 删除-执行 */
  function Delete(): bool {
    list($sql, $args) = $this->DeleteSql();
    if(empty($sql)) return false;
    $res = $this->Exec($sql, $args);
    if($res){
      $this->nums = $this->conn->affectedRows();
      return true;
    }
    return false;
  }

}