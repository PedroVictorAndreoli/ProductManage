# ProductManage


-Aconselhável rodar o back end na porta 5110 utilizando http


-Aconselhável rodar o front na porta 4200


Utilizei postgres com as seguintes informações para a conexao:

"User ID=postgres;
Password=postgre;
Host=127.0.0.1;
Port=5432;
Database=produto;
Connection Lifetime=0"

Caso precise alterar alguma coisa dentro da conexao,va para o ProductContext e atualize manualmente
Preparei as migrations, entao assim que tivar pronto para conectar, aconselhavel necessario rodar elas


Caso der esse erro da imagem:
![image](https://github.com/user-attachments/assets/82cca5c1-3c11-44ba-a692-0f7fb635014e)
apague oq estiver marcado na classe indicada e rode o back novamente
