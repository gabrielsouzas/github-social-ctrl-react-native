import { getUserDataAsyncStorage } from '../utils/asyncStorage';

const Octokit = require('@octokit/core').Octokit;

export async function fetchAll(res) {
  let allItens = [];
  let page = 1;

  try {
    const userData = await getUserDataAsyncStorage('userData');

    if (userData != null || userData != undefined) {
      const octokit = new Octokit({
        auth: userData.token,
      });

      while (true) {
        const url = `GET /users/{username}/${res}?per_page=100&page=${page}`;
        const response = await octokit.request(url, {
          username: userData.username,
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
    }
    return { status: 'empty', message: 'AsyncStorage data not found' };
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    return { status: 'error', message: `Error fetching data. Error: ${error}` };
  }
}

export async function followUser(username) {
  try {
    const userData = await getUserDataAsyncStorage('userData');

    if (userData != null || userData != undefined) {
      const octokit = new Octokit({
        auth: userData.token,
      });

      await octokit.request('PUT /user/following/{username}', {
        username: username,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return { status: 'success', message: 'User followed' };
    }
  } catch (error) {
    console.error('Error following user. Error:', error);
    let msg = '';
    if (error.message.includes('Requires authentication')) {
      msg =
        'Enter an Access Token on the registration screen to authenticate yourself to carry out this operation';
    }
    return {
      status: 'error',
      error: `Error: ${msg ? msg : error}`,
      message: `Error unfollowing user`,
    };
  }
}

export async function unFollowUser(username) {
  try {
    const userData = await getUserDataAsyncStorage('userData');

    if (userData != null || userData != undefined) {
      const octokit = new Octokit({
        auth: userData.token,
      });

      await octokit.request('DELETE /user/following/{username}', {
        username: username,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return { status: 'success', message: 'User unfollowed' };
    }
  } catch (error) {
    console.error('Error unfollowing user. Error:', error);
    let msg = '';
    if (error.message.includes('Requires authentication')) {
      msg =
        'Enter an Access Token on the registration screen to authenticate yourself to carry out this operation';
    }
    return {
      status: 'error',
      error: `Error: ${msg ? msg : error}`,
      message: `Error unfollowing user`,
    };
  }
}
