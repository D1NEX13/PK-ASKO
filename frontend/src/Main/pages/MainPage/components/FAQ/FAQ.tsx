import { Collapse, Flex } from 'antd';
import type { ReactNode } from 'react';

function FAQ(): ReactNode {
	return (
		<Flex
			style={{ paddingTop: 50 }}
			vertical={true}
			align="center"
			justify="center"
			gap={32}
		>
			<Collapse
				style={{
					width: '50%',
					fontSize: 18,
					display: 'flex',
					alignItems: 'center',
				}}
				size="large"
				items={[
					{
						key: '1',
						label: 'Какие материалы вы обрабатываете?',
						children: (
							<p>
								Мы работаем с широким спектром металлов: конструкционная и
								нержавеющая сталь, алюминий, медь, латунь, а также различные виды
								пластика. Для получения точной информации о возможности обработки
								вашего материала, пожалуйста, свяжитесь с нашими менеджерами.
							</p>
						),
					},
				]}
			/>
			<Collapse
				style={{
					width: '50%',
					fontSize: 18,
					display: 'flex',
					alignItems: 'center',
				}}
				size="large"
				items={[
					{
						key: '2',
						label: 'Каковы минимальные сроки выполнения заказа?',
						children: (
							<p>
								Выполняем заказы в кратчайшие сроки, в зависимости от сложности и
								объема работы.
							</p>
						),
					},
				]}
			/>
			<Collapse
				style={{
					width: '50%',
					fontSize: 18,
					display: 'flex',
					alignItems: 'center',
				}}
				size="large"
				items={[{ key: '3', label: 'Где прогресс?', children: <p>Не будет</p> }]}
			/>
		</Flex>
	);
}

export default FAQ;
