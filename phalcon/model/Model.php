<?php
namespace Model;

use Service\Base;
use Config\Db;
use Util\Type;

/* 数据库 */
class Model extends Base {

  static $DBDefault = null;      //默认池
  static $DBOther = null;        //其它池

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
  private $columnsType = [];     //字段类型

  /* 连接 */
  function DBConn() {
    if($this->db=='other'){
      if(!Model::$DBOther) Model::$DBOther=$this->DBPool(Db::Other());
      $conn = self::$DBOther;
    } else {     
      if(!Model::$DBDefault) Model::$DBDefault=$this->DBPool(Db::Default());
      $conn = self::$DBDefault;
    }
    return $conn;
  }

  /* 连接池 */
  function DBPool(array $cfg) {
    // Postgresql
    if ($cfg['driver'] == 'Postgresql') unset($params['charset']);
    // 命名空间
    $class = 'Phalcon\Db\Adapter\Pdo\\'.$cfg['driver'];
    unset($cfg['driver']);
    try {
      return new $class($cfg);
    }catch (\Exception $e){
      $this->Print('[Model] Pool:', $e->getMessage());
      return null;
    }
  }

  /* 查询 */
  function Query($conn, string $sql, array $args) {
    if(empty($sql)){
      $this->Print('[Model] Query: SQL不能为空!');
      return null;
    }
    try {
      return $conn->query($sql, $args);
    }catch (\Exception $e){
      $this->Print('[Model] Query:', $e->getMessage());
      $this->Print('[Model] SQL:', $sql);
      return null;
    }
  }

  /* 执行 */
  function Exec($conn, string $sql, array $args) {
    if(empty($sql)){
      $this->Print('[Model] Exec: SQL不能为空!');
      return null;
    }
    try {
      return $conn->execute($sql, $args);
    }catch (\Exception $e){
      $this->Print('[Model] Exec:', $e->getMessage());
      $this->Print('[Model] SQL:', $sql, $args);
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
  /* 字段-返回类型 */
  function ResType(array $type) {
    $this->columnsType = $type;
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
  function SelectSQL(): array {
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
    if($this->group != ''){
      $this->sql .= ' GROUP BY '.$this->group;
      $this->group = '';
    }
    if($this->order != ''){
      $this->sql .= ' ORDER BY '.$this->order;
      $this->order = '';
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
    list($sql, $args) = $this->SelectSQL();
    $conn = $this->DBConn();
    $data = $conn->fetchAll($sql, 2, $args);
    if(count($this->columnsType)==0) return $data;
    // 转换类型
    foreach($data as $k1=>$v1) {
      foreach($v1 as $k2=>$v2){
        if(isset($this->columnsType[$k2])){
          $data[$k1][$k2] = Type::ToType($this->columnsType[$k2], $v2);
        }
      }
    }
    $this->columnsType = [];
    return $data;
  }
  /* 查询-单条 */
  function FindFirst() {
    $this->limit = '0,1';
    list($sql, $args) = $this->SelectSQL();
    $conn = $this->DBConn();
    $data = $conn->fetchOne($sql, 2, $args);
    if(!$data) return [];
    if(count($this->columnsType)==0) return $data;
    // 转换类型
    foreach($data as $k=>$v) {
      if(isset($this->columnsType[$k])){
        $data[$k] = Type::ToType($this->columnsType[$k], $v);
      }
    }
    $this->columnsType = [];
    return $data;
  }

  /* 添加-单条 */
  function Values(array $data) {
    list($keys, $vals) = [[], []];
    $this->args = [];
    foreach($data as $k=>$v){
      $keys[] = $k;
		  $vals[] = '?';
      $this->args[] = $v;
    }
    $this->keys = implode(', ', $keys);
    $this->values = '(' . implode(', ', $vals). ')';
  }
  /* 添加-多条 */
  function ValuesAll(array $data) {
    list($keys, $vals, $alls) = [[], [], []];
    $this->args = [];
    foreach($data[0] as $k=>$v){
      $keys[] = $k;
		  $vals[] = '?';
    }
    foreach ($data as $i=>$v) {
      foreach ($keys as $k) {
        $this->args[] = $data[$i][$k];
      }
      $alls[] = '(' . implode(', ', $vals) . ')';
    }
    $this->keys = implode(', ', $keys);
    $this->values = implode(', ', $alls);
  }
  /* 添加-SQL */
  function InsertSQL(): ?array {
    if($this->table==''){
      $this->Print('[Model] Insert: 表不能为空!');
      return ['',$this->args];
    }
    if($this->keys=='' || $this->values==''){
      $this->Print('[Model] Insert: 数据不能为空!');
      return ['',$this->args];
    }
    $this->sql = 'INSERT INTO `' . $this->table . '`(' . $this->keys . ') VALUES ' . $this->values;
    $args = $this->args;
    // 重置
    $this->keys = '';
    $this->values = '';
    $this->args = [];
    return [$this->sql, $args];
  }
  /* 添加-执行 */
  function Insert(): bool {
    list($sql, $args) = $this->InsertSQL();
    $conn = $this->DBConn();
    $res = $this->Exec($conn, $sql, $args);
    if($res){
       $this->id = $conn->lastInsertId();
      return true;
    }
    return false;
  }
  /* 添加-自增ID */
  function LastInsertId($conn): int {
    return $conn->lastInsertId();
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
  function UpdateSQL(): array {
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
    list($sql, $args) = $this->UpdateSQL();
    $conn = $this->DBConn();
    $res = $this->Exec($conn, $sql, $args);
    if($res){
      $this->nums = $conn->affectedRows();
      return true;
    }
    return false;
  }

  /* 删除-SQL */
  function DeleteSQL(): array {
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
    list($sql, $args) = $this->DeleteSQL();
    $conn = $this->DBConn();
    $res = $this->Exec($conn, $sql, $args);
    if($res){
      $this->nums = $conn->affectedRows();
      return true;
    }
    return false;
  }

}