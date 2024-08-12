let str = '9+(3-1)*3+8/2';
// 中缀表达式转后缀表达式
/*
规则:从左到右遍历中缀表达式的每个数字和符号，若是数字就输出，即成为后
缀表达式的一部分;若是符号，则判断其与栈顶符号的优先级，是右括号或优先级低
于栈顶符号(乘除优先加减)则栈顶元素依次出栈并输出，并将当前符号进栈，一直
到最终输出后级表达式为止。
*/
function getPostfix(infix) {
	const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 }; //处理优先级
	let stack = []; // 空栈，用来对符号进出栈使用
	let postfix = []; // 后缀表达式
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		if (!isNaN(char)) {
			// 如果是数字，则加入后缀表达式
			postfix.push(char);
		} else if (char === '(') {
			// 如果是左括号，则入栈
			stack.push(char);
		} else if (char === ')') {
			// 如果是右括号，则弹出栈内运算符直到遇到左括号
			while (stack.length && stack[stack.length - 1] !== '(') {
				postfix.push(stack.pop());
			}
			// 上方while剩余左括号未处理，处理剩余的左括号
			if (stack.length && stack[stack.length - 1] === '(') {
				stack.pop();
			}
		} else {
			// 如果是运算符，则弹出栈内运算符直到遇到优先级小于当前运算符的运算符或栈为空，然后将当前运算符入栈
			while (stack.length && precedence[char] <= precedence[stack[stack.length - 1]]) {
				postfix.push(stack.pop());
			}
			stack.push(char);
		}
	}
	// 将栈内剩余的运算符弹出
	while (stack.length) {
		postfix.push(stack.pop());
	}
	return postfix;
}
console.log(getPostfix(str));
// 通过后缀表达式计算
function calc(postFix) {
	let stack = [];
	for (let i = 0; i < postFix.length; i++) {
		const item = postFix[i];
		// 改进类型检查
		if (typeof item === 'number' || !isNaN(Number(item))) {
			// 确保item是数字
			stack.push(Number(item)); // 显式转换为数字
			console.log(stack);
		} else {
			// 防止空栈操作
			if (stack.length < 2) {
				throw new Error('Invalid expression');
			}
			let b = stack.pop(); // 第一个操作数
			let a = stack.pop(); // 第二个操作数
			let result;
			console.log(`${a}${item}${b}`);
			switch (item) {
				case '+':
					result = a + b;
					break;
				case '-':
					result = a - b;
					break;
				case '*':
					result = a * b;
					break;
				case '/':
					if (b === 0) {
						throw new Error('Division by zero');
					}
					result = a / b;
					break;
			}
			stack.push(result);
		}
	}
	console.log(stack.pop()); // 输出最终结果
}
calc(getPostfix(str));
