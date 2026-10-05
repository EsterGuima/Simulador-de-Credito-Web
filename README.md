# Simulador de Crédito Web

Versão web do meu projeto acadêmico [Sistema para Concessionária](https://github.com/EsterGuima/Sistema-para-Concessionaria), que originalmente foi feito em C para o terminal. Desenvolvido em **HTML, CSS e JavaScript**.

**Demonstração:** https://esterguima.github.io/Simulador-de-Credito-Web/

## Como funciona?

O usuário deve informar seu nome, sua renda mensal, modelo e valor do veículo. O sistema calcula o **limite de compra (6 vezes a renda mensal)**:

- valor do veículo **menor ou igual** ao limite: crédito **aprovado**;
- caso contrário: **reprovado por renda insuficiente**.

Cada análise entra em um relatório na própria página (até 10 por vez). Os dados ficam só na memória do navegador.


## Conceitos aplicados

- HTML: formulário com validação nativa (`required`, `min`, `type="number"`)
- CSS: variáveis, layout simples mas responsivo e destaque visual do resultado
- JavaScript: funções, `if / else`, vetor de objetos.
- Mesma regra de negócio do projeto em C, reescrita em outra linguagem

## Data

Projeto realizado em Outubro/2026
