<template>
  <Form
    :entity="entity"
    :submit="submit"
    :alert="alert"
    :loading="loading"
    @onSubmit="onSubmit"
  />
</template>

<script>
import forms from '@/mixins/forms';
// import common from '@/mixins/common';
import Form from '../components/Form.vue';
export default {
  name: 'Home',
  components: {
    Form,
  },
  mixins: [forms],
  data() {
    return {
      pad: parseInt(import.meta.env.VITE_PAD_ID),
      pPad: parseInt(import.meta.env.VITE_PAD_PARTNER_ID),
      sPad: parseInt(import.meta.env.VITE_PAD_SUBPARTNER_ID),
      entity: {
        label: this.$t('Entry checking form'),
        fillables: [
          {
            codename: 'entry',
            type: 'text',
            title: this.$t('Entry Code'),
            placeholder: null,
            required: true,
            regex: null,
            validationMessage: this.$t('Invalid entry code format'),
          },
        ],
        // fillables here
        entry: null, // must match the codename
        // fillables end
      },
      submit: this.$t('Check'),
      loading: false,
      alert: {
        type: null,
        message: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.alert.type = null;
      this.alert.message = null;
      // from forms mixin
      if (this.validated(this.entity)) {
        this.loading = true;
        //axios.get('/sanctum/csrf-cookie').then(r => {
          axios({
            method: 'POST',
            url: '/api/partner-ids/check',
            // from forms mixin
            data: this.data,
            // withCredentials: true,
          })
          .then(response => {
            console.log('response', response);
            if(response.status === 200 && response.data.answer === 'correct') {
              this.alert.type = 'text-success';
              this.alert.message = `${this.$t('Entry code is valid')}
                <br><i>${this.$t('Subpartner')}</i>: <b>${response.data.details.subpartner.name}</b>`;
            } else {
              this.alert.type = 'text-danger';
              this.alert.message = this.$t('Entry code is invalid');
            }
          })
          .catch((error) => {
            console.log('error', error);
            this.alert.type = 'text-danger';
            this.alert.message = this.$t('Server side error, contact vendor');
          })
          .then(_ => {
            this.loading = false;
          });
        //});
      }
    },
  },
  created() {
    // ^[0-9]{6}[-]?[0-9]{2}[-]?[0-9]{2}[-]?[0-9]{3}$
    this.entity.fillables[0].regex = `^[0-9]{6}[-]?[0-9]{${this.pPad}}[-]?[0-9]{${this.sPad}}[-]?[0-9]{${this.pad}}$`;
    this.entity.fillables[0].placeholder = `######-${''.padStart(this.pPad, '#')}-${''.padStart(this.sPad, '#')}-${''.padStart(this.pad, '#')}`;
  },
}
</script>

<style>
html, body, #entries-app, .with-background {
  height: 100%;
}
body {
  background-image: url('../../images/background.png');
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: cover;
  width: 100%;
}
</style>