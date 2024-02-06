const Octokit = require('@octokit/core').Octokit;

const octokit = new Octokit({
  auth: '',
});

export async function fetchAll(res, user, per_page = '100') {
  let allItens = [];
  let page = 1;

  try {
    while (true) {
      const url = `GET /users/{username}/${res}?per_page=${per_page}&page=${page}`;
      const response = await octokit.request(url, {
        username: user,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      var data = response.data;

      if (data.length === 0) {
        break;
      }

      allItens = allItens.concat(data);
      page++;
    }

    return allItens;
  } catch (erro) {
    console.error('Erro ao obter dados:', erro);
    throw erro;
  }
}
