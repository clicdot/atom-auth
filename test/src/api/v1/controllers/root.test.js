'use strict';

const { test } = require('tap');
const { build, close } = require('../../../../helper');

test('root test', (assert) => {
  const app = build(assert);

  assert.plan(3);

  assert.test('bad access token route', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: { Authorization: 'Bearer badtoken' }
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 401, 'Failed Auth');
    // assert.deepEqual(response.function, { method: 'GET', url: '/api/v1', ip: '127.0.0.1' }, 'Test function');
    assert.ok(response.messages.errors, 'Errors Exist');
    assert.same(response.messages.errors[0], 'Unauthorized', 'Unauthorized Error');
    assert.same(response.messages.errors[1], 'Authorization token is invalid: jwt malformed', 'Unauthorized Error');
  });

  assert.test('no access token route', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: {}
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 401, 'Failed Auth');
    assert.deepEqual(response.function, { method: 'GET', url: '/api/v1', ip: '127.0.0.1' }, 'Test function');
    assert.ok(response.messages.errors, 'Errors Exist');
    assert.same(response.messages.errors[0], 'Authorization Error: No Access token provided.', 'Unauthorized Error');
  });

  assert.test('root test access token route', async (assert) => {
    // const auth = await app.inject({
    //   method: 'POST',
    //   url: '/auth/token',
    //   payload: { secret: 'iBtLp7aqZMbeG74AsgDGgx92fpEoCEtC7hvvYabQrVVXNih47j2fjzR4btYUJWMJ' }
    // });

    // const { accessToken } = JSON.parse(auth.payload).data;
    // console.log('RESULTS', response)
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: { Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM1MTczOTgsImV4cCI6MTY2ODEyNDgwMCwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiZmNlODFmMDUtMzNhNy00YzA2LWFkZjctMTlhMDUzNmRhOWZkIiwicHJvZmlsZSI6e30sInNjb3BlIjpbXSwiYXVkIjoiaHR0cHM6Ly9hdXRvbWF0aXplLmNvbSIsImlzcyI6ImFwaS5hdXRvbWF0aXplLmNvbSJ9.E4vrRqIeIRLNHZ3AeZ4XPvxgW8C074V9zP0PunuWYnxqwGjggz_q989g7aKrmlPvW7qsKsDV1r_9-cmY-YOFkKPI0dkZGHHVtf36zuoiZXiJlk5fbkN72vlqUICeEvf3OWCXdGEtjg6LNKYdq_Ia-PrWRYEjREXb3fO7xogrNiLkV_N7U3-tVI02DHIKfyywKoyXNuHZlbTaYgkd9k7YegAdBg1AKy0mEPhlCnpBtcamquIOUDRPlp1G1SixRE6JoL46kE54lxjEVay1k7YrciLHF10LuK8hJuwayUDxdk5sK-2qEHW1ZMv_x9nMX9OLlxOYxcJfsG2Vur4ZXCTmKMKVjlTsSWpJyXIdgBOB_sHPDbwB04xeR2OQrIN9uBDKdMrZtzFO3muRHM4Dw3NCQd4plYppTWhdAcQZF3V4B0lDh5gi_KbSc1Qwg_p1QkG2WtsweTb3dj6KMInT5LiKyGVNVkBJAXb1p9GRFbac99JGS_Znusvmp83Ey128OxA0sD0O-eGmA7ZlbxZ3L_b6W1AB2aAj8w7RLhUIZIZ-FQmArlnNxyfq2qKD2W8se6muD6SnGkOB7zhWg3ZAnnnxNJoeV9wTaLCmpEe7d2dQcoMcnPdyR7obJuN_vEFbz6U_jd9TCHltAEm10Dg7O8S6fqZYry16XQPg7ykZch_Kilw' }
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 200, 'Success');
    assert.deepEqual(response.function, { method: 'GET', url: '/api/v1', ip: '127.0.0.1', apiVersion: 'v1' }, 'Test function');
    assert.notOk(response.messages, 'Errors do not exist');
    close(app);
    // assert.end();
  });
});
