![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)



------

## JavaScript Study 08

- 용어
- 스코프
  - 순수 함수
  - 비순수 함수
  - 스코프의 종류
  - 스코프 체인
  - 렉시컬 스코프
  - 암묵적 전역 변수
  - JS 모듈 미지원
    - 모듈

- 전역 변수의 문제점
  - 전역 변수 사용 억제 방법

- let, const와 블록 레벨 스코프
  - var 키워드로 선언한 변수의 문제점
  - let 키워드와 var 키워드의 차이점
  - const 키워드
  - const 키워드와 객체
  - var : let : const

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 스코프
- 순수 함수
- 비순수 함수
- 전역 변수
- 암묵적 전역 변수
- 지역 변수
- let : var : const
- var 의 문제점
- let 키워드 특징
- const 키워드 특징

<br/>

------

## 스코프

> **JS엔진이 식별자를 찾는 규칙. 식별자가 유효한 범위**
>
> 스코프는 유효범위 , 변수의 생명주기와 큰 관련이 있다.
>
> JS에서는 함수가 스코프 큰 관련이 있다.

**객체의 프로퍼티는 스코프에 존재하는게 아니라, 프로토타입 스코프 체인에 존재한다.**

**함수의 코드 블록이 스코프를 만든다.**

자바스크립트는 함수 레벨 스코프다.

함수의 매개변수는 함수 몸체 내부에서만 참조할 수 있고 , 몸체 외부에서는 참조할 수 없다.

➤  매개변수를 참조할 수 있는 유효한 범위, 즉 **매개변수의 스코프가 함수 몸체 내부로 한정**되기 때문이다.

~~~javascript
//순수 함수
function add(x, y) {
  // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
  // 즉, 매개변수의 스코프(유효범위)는 함수 몸체 내부이다.
  console.log(x, y); // 2 5
  return x + y;
}

add(2, 5);

// 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); // ReferenceError: x is not defined
~~~

<br/>

~~~javascript
//비순수 함수
var num = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

function increase() {
  return ++num; // 외부 상태를 변경한다.
}

console.log(increase()); // 1
console.log(increase()); // 2
~~~

`num`은 누구나 참조할 수 있는 전역 변수이다.

`increase()`에서도 `num`은 참조할 수 있다. 이렇게 누구나 사용 가능 하게끔 설정할 때는 변수보다는 상수를 이용하는게 더 효율적이다. 단, 상수는 재할당이 불가능하므로 해당 값이 변해도 되는지를 판단을 하여야만 한다.

<br/>

#### 순수 함수

> 동일한 인수가 전달되면 언제나 동일한 값을 반환하는 함수를 말한다. ( 위 add예제 )

<br/>

#### 비순수 함수

> 함수의 외부 상태에 의존하여 외부 상태에 따라 반환값이 달라지는 함수. ( 위 increase 예제 )

<br/>

#### 즉, 스코프는 식별자가 유효한 범위를 의미

**모든 식별자(변수 명 ← (함수명), 클래스 명 등)은 자신이  선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효범위가 결정된다. **

~~~javascript
var x = 'global';

function foo() {
  var x = 'local';
  console.log(x); // ① local
}

foo();

console.log(x); // ② global
~~~

<img src="https://poiemaweb.com/assets/fs-images/12-1.png" style="zoom:50%;" />

<br/>

### 스코프의 종류

​	코드는 전역(global)과 지역(local)으로 구분할 수 있다.

| 구분 | 설명                  | 스코프      | 변수      |
| :--: | :-------------------- | :---------- | :-------- |
| 전역 | 코드의 가장 바깥 영역 | 전역 스코프 | 전역 변수 |
| 지역 | 함수 몸체 내부        | 지역 스코프 | 지역 변수 |

이때 변수는 자신이 선언된 위치(전역 또는 지역)에 의해 자신이 유효한 범위인 스코프가 결정된다. 즉, 전역에서 선언된 변수는 전역 스코프를 갖는 전역 변수이고, 지역에서 선언된 변수는 지역 스코프를 갖는 지역 변수이다.

<img src="https://poiemaweb.com/assets/fs-images/12-2.png" alt="poiema-web 전역/지역" style="zoom:50%;" />

**전역 변수는 어디서든지 참조할 수 있다.**

**부모는 부모꺼만 쓸 수 있고, 자식은 자신과 부모꺼 모두 사용할 수 있다.**

<br/>

~~~javascript
// 1.
var x = 5;

function fn() {
	var x = 9;
	console.log(x); // 1-1 : 9
	return x;
}

fn();
console.log(x); // 1-2: 5
~~~

~~~~javascript
// 2.
var x = 5;

function fn() {
	x = 9;
	console.log(x); // 2-1 : 9
	return x;
}

fn();
console.log(x); // 2-2 : 9
~~~~

1  과 2의 차이는 무엇일까?

1은 `fn()`의 지역 스코프에서 x라는 **변수를 선언하여 9를 할당**하였다. 결국 전역 스코프의 x는 변하지 않는다.

2는 `fn()` 지역 스코프에서 x라는 변수에 9를 **재할당** 한 것이다. 결국 2는 전역 스코프의 x값이 바뀌고 9가 출력된다.

<br/>

### 스코프 체인

> 함수는 중첩될 수 있으므로 함수의 지역 스코프도 중첩될 수 있다. 이는 **스코프는 함수의 중첩에 의해 계층적 구조를 갖는다**는 것을 의미.

<img src="https://poiemaweb.com/assets/fs-images/12-3.png" alt="스코프 체인 - poiemaweb" style="zoom:50%;" />

**변수를 참조할 때, **
자바스크립트 엔진은 **스코프 체인을 통해**
**변수를 참조하는 코드의 스코프에서 시작**하여
**상위 스코프 방향으로 이동하며 선언된 변수를 검색한다.**

~~~javascript
// 전역 함수
function foo() {
  console.log('global function foo');
}

function bar() {
  // 중첩 함수
  function foo() {
    console.log('local function foo');
  }

  foo(); // ①
}

bar();
~~~

<br/>

### 렉시컬 스코프

> JS에서는 상위 스코프의 결정 방식을 렉시컬 스코프 하게 짓는다.
>
> ***함수를 어디서 정의*했는지에 따라 함수의 상위 스코프를 결정한다.**

~~~
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
~~~

정답은 `foo`는 1 , `bar` 도 1이다. `bar`는 전역 스코프에서 정의가 되었다. 따라서 `bar`의 스코프 위치는 전역의 바로 아래이다.

따라서 `bar()`를 호출했을 때, `bar()`의 내용물은 결국 전역 스코프에 읽게 된다.

만약 `bar()`가 `foo()` 내부의 스코프를 타서 x값을 읽어드렸다면, 이를 동적 스코프(함수를 호출한 위치로 스코프 결정)라 한다.

대부분의 언어(JS를 포함)는 렉시컬 스코프를 지원한다.

이유는 동적 스코프는 가독성이 떨어지기 때문이다.

<br/>

### 암묵적 전역 변수

~~~javascript
function foo() {
  // 선언하지 않은 변수에 값을 할당하면 암묵적 전역 변수가 된다.
  x = 10;
}

foo();

console.log(x); // 10
~~~

나는 `foo()`라는 변수와 `foo()내부의 x` 를 선언한적이 없다.

근데 `foo()`를 호출할수 있고 또 console.log에서 `x`를 찾아 출력까지 했다..

이처럼 **선언하지 않은 변수에 값을 할당하면 자바스크립트 엔진은 아무런 에러없이 암묵적으로 전역 변수를 선언하고 값을 할당한다.**

**과정**

1. 함수 foo가 호출
2. 변수 x에 값을 할당하기 위해 자바스크립트 엔진은 스코프 체인을 따라서 함수 foo의 스코프부터 변수 x의 선언을 찾는다.
3. 함수 foo에는 x의 선언이 존재하지 않으므로 전역에서 x의 선언을 찾는다.
4. 전역 스코프에서도 변수 x의 선언을 찾을 수 없다.
5. ➤ 참조에러를 발생시켜야 하지만, 자바스크립트 엔진은 암묵적으로 전역 변수 x를 선언한다.

<br/>

### JS 모듈 미지원

만약 2개의 `.js`파일이 있다고 가정하고. 하나의 html파일에서 js를 로드했다고 하자.

~~~javascript
// x.js
function foo() {
  i = 0; // 암묵적 전역 변수
  // ...
}

// y.js
for (var i = 0; i < 5; i++) {
  foo();
  console.log(i);
}
~~~

~~~html
<!DOCTYPE html>
<html>
<body>
  <script src='x.js'></script>
  <script src='y.js'></script>
</body>
</html>
~~~

이경우 `y.js`의 var 키워드로 선언된 변수는 함수의 코드 블록 만을 지역 스코프로 인정한다.
따라서 for문에서 선언한 i는 전역 변수이다.
이미 암묵적 전역 변수 i가 있으므로 변수 i는 중복 선언된다.
결국 `y.js` 에서 호출한 `foo()` 때문에 i는 게속 0으로 할당될 것이고 무한루프에 빠지게 된다.

여기서 HTML에서 로드한 js파일들은 모두 하나의 전역 스코프를 공유한다.

자바스크립트 파일을 여러 개로 분리하여도 결국 하나의 자바스크립트 파일로 통합된 것처럼 동작한다.

즉, i는 서로간에 충돌을 일으킨다. 다시 말해 **자바스크립트는 파일마다 독립적인 파일 스코프를 갖지 않는다.**

**자바스크립트에는 모듈이라는 개념이 없기 때문. **모듈화가 되려면 file스코프를 지원되어야 한다.

를 해결하기 위해 번들링 (Webpack) 이라는 개념이 나왔다. (이는 추후에 공부)

<br/>

#### 모듈

모듈의 역할 : Bundling

> 애플리케이션을 구성하는 개별적 요소로 재사용이 가능한 코드 조각을 의미

공개가 필요한 API만을 외부에 노출시키며, 세부적인 부분은 캡슐화로 정보은닉.

ES6 부터 기능이 제공.

------------

## 전역 변수의 문제점

> 스코프를 통해 전역변수가 위험하다는 것을 직간접적으로 느꼈을 것이다.
>
> 따라서 생명주기에 대해 제대로 공부해야한다.

<br/>

1. **긴  생명주기**로 인해 버그 발생률을 높인다. (이름 충돌, 메모리 리소스 높이는 원인, 상태 변경 등등)
2.  모든코드가 전역 변수를 참조하고 변경할 수 있는 **암묵적 결합(implicit coupling)**을 허용하는 것.
3. 스코프 체인상 종점에 존재하기 때문에 **검색속도가 느리다.**
4. 파일이 분리되어도 전역 스코프는 공유하기 때문에 **네임스페이스 오염**이 일어난다.
5. 리소스 활용이 어려워진다.

<br/>

### 전역 변수 사용 억제 방법

1. 즉시 실행 함수

2. 네임 스페이스 객체

   ~~~javascript
   var MYAPP = {}; // 전역 네임 스페이스 객체

   MYAPP.name = 'Lee';

   console.log(MYAPP.name); // Lee
   ~~~

   <br/>

3. 모듈패턴

   ~~~javascript
   var Counter = (function () {
     // private 변수
     var num = 0;

     // 외부로 공개할 데이터나 메소드를 프로퍼티로 추가한 객체를 반환한다.
     return {
       increase() { // 메소드 축약 표현
         return ++num;
       },
       decrease() { // 메소드 축약 표현
         return --num;
       }
     };
   }());

   // private 변수는 외부로 노출되지 않는다.
   console.log(Counter.num); // undefined

   console.log(Counter.increase()); // 1
   console.log(Counter.increase()); // 2
   console.log(Counter.decrease()); // 1
   console.log(Counter.decrease()); // 0
   ~~~

   위 예제에서는 `return`을 이용하여 변수의 노출 여부를 판단하고 있다.

   자바스크립트의 강력한 기능인 클로저를 기반으로 동작하는 모듈 패턴은

   클래스를 모방하여 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만든다.

   <br/>

------------



## let, const 와 블록 레벨 스코프

### var 키워드로 선언한 변수의 문제점

1. 변수호이스팅 (가독성 방해 No.1)
2. 중복 선언 허용. (중복 선언시, 에러를 유발하는게 아닌 재할당처럼 동작)
3. **암묵적 전역 변수** (var키워드 없이 할당할 경우. 강제 전역 변수로 암묵적 실행)
4. **지역 레벨 스코프를 지원**, 블록 레벨 스코프 사용불가(for, if 등등)

<br/>

### let 키워드와 var 키워드의 차이점

1. **변수 중복 성언 금지** : 중복 선언시 문법 에러를 유발.

   ~~~javascript
   var foo = 123;
   // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
   // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
   var foo = 456;

   let bar = 123;
   // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
   let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
   ~~~

   <br/>

2. **블록 레벨 스코프를 지원**

   ~~~javascript
   let foo = 123; // 전역 변수

   {
     let foo = 456; // 지역 변수
     let bar = 456; // 지역 변수
   }  // -> 블록 레벨 스코프

   console.log(foo); // 123
   console.log(bar); // ReferenceError: bar is not defined
   ~~~

   변수 이름은 스코프만 분리되어 있으면 된다. (그렇다고 좋은것 이나고 가급적이면 이름을 다르게 지어야한다.)

   위 코드는 `{ } 블록`으로 스코프가 나뉘게 되었다. let은 블록 레벨 스코프를 따른다.

   <br/>

3. **변수 호이스팅** : `let`은 변수 호이스팅을 안하는것 처럼 보일 뿐, 호이스팅을 한다.

   `let`은 호이스팅 할 경우, `undefined`로 초기화 시키지 않는다.

   **초기화는 변수 선언문에 도달했을 때 실행된다.**

   스코프의 시작 지점부터 초기화 시작 지점까지의 구간을 TDZ (일시적 사각지대)라 칭한다.

   ~~~javascript
   let foo = 1; // 전역 변수

   {
     console.log(foo); // ReferenceError: foo is not defined - TDZ일시적 사각지대
     let foo = 2; // 지역 변수
   }
   ~~~

   <br/>

4. **전역 객체와  let**

   window는 전역객체다.

   `var` 키워드 만든 전역변수, 전역 함수와 암묵적으로 만들어진 전역 변수들은 `window`의 프로퍼티다.

   전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.

   반면에,

   **`let` 와 `const`로 만든 전역 변수는 window의 프로퍼티가 아니다.**

   `let`, `const`의 전역 변수의 생명주기는 죽을 때는 실행코드가 전부 실행되고 끝날때 끝난다.
   (window는 실행코드가 끝나도 살아있다.)

   `let` 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.

   ~~~javascript
   // 이 예제는 브라우저 환경에서 실행시켜야 한다.
   let x = 1;

   // let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.
   console.log(window.x); // undefined
   console.log(x); // 1
   ~~~

<br/>

### const 키워드

1. 상수를 선언할 때 사용. 상수도 변수다. 다만, 재할당만 불가능함.

2. 재할당불가

3. 변수 선언과 동시 할당해야만 한다.

   **변수를 선언할때 가급적이면 const로 상수를 선언하고 필요한 경우에만 let을 이용하여야 한다.**

<br/>

### const 키워드와 객체

const 키워드로 선언된 변수는 재할당이 금지된다.
객체는 변경 가능한 값(mutable value)이다.
따라서 const 키워드로 선언된 변수에 할당된 객체는 변경이 가능하다.

~~~ javascript
const person = {
  name: 'Lee'
};

// 객체는 변경 가능한 값이다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}
~~~

<br/>

### var vs. let vs. const

변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다. 원시 값의 경우, 가급적 상수를 사용하는 편이 좋다. 그리고 객체를 재할당하는 경우는 생각보다 흔하지 않다. const 키워드를 사용하면 의도치 않은 재할당을 방지해 주기 때문에 보다 안전하다.

var와 let, 그리고 const 키워드는 다음처럼 사용하는 것을 추천한다.

- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않는(재할당이 필요 없는 상수) 원시 값과 객체에는 const 키워드를 사용한다. const 키워드는 재할당을 금지하므로 var, let 보다 안전하다.

변수를 선언하는 시점에는 재할당이 필요할지 잘 모르는 경우가 많다. 그리고 객체는 의외로 재할당을 하는 경우가 드물다. 따라서 변수를 선언할 때에는 일단 const 키워드를 사용하도록 하자. 반드시 재할당이 필요하다면(반드시 재할당이 필요한지 한번 생각해 볼 일이다.) 그때 const를 let 키워드로 변경해도 결코 늦지 않는다.