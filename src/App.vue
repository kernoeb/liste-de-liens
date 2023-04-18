<script>
export default {
  data() {
    return {
      websites: JSON.parse(localStorage.getItem('websites') || '[]'),
      newWebsite: {
        name: '',
        url: '',
      },
    }
  },
  methods: {
    addWebsite() {
      if (this.newWebsite.name && this.newWebsite.url) {
        this.websites.push(this.newWebsite)
        this.newWebsite = {
          name: '',
          url: '',
          icon: '',
        }
        localStorage.setItem('websites', JSON.stringify(this.websites))
      }
    },
    removeWebsite(index) {
      this.websites.splice(index, 1)
      localStorage.setItem('websites', JSON.stringify(this.websites))
    },
    openWebsite(url) {
      window.open(url, '_blank')
    },
    goodIcon(website) {
      if (website.icon) {
        return website.icon
      }
      else {
        // add missing protocol
        if (!website.url.startsWith('http'))
          website.url = `https://${website.url}`
        website.url = website.url.toLowerCase().trim()
        return `https://s2.googleusercontent.com/s2/favicons?domain=${website.url}`
      }
    },
  },
}
</script>

<template>
  <v-app>
    <v-main>
      <v-system-bar
        dark
        app
        color="primary"
      >
        <v-spacer />
        <span class="font-weight-bold">Liste de liens</span>
        <v-spacer />
      </v-system-bar>
      <v-container>
        <v-row>
          <v-col v-for="(website, index) in websites" :key="index" cols="12" sm="6" md="4">
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto my-4" max-width="400" rounded="lg" :elevation="hover ? 5 : 3" @click="openWebsite(website.url)">
                <v-card-title>
                  <v-avatar size="20" class="mr-4">
                    <img :src="goodIcon(website)" alt="icon">
                  </v-avatar>
                  {{ website.name }}
                </v-card-title>
                <v-card-text>
                  {{ website.url }}
                </v-card-text>
                <div v-if="hover" style="position: absolute; right: 5px; top: 5px;">
                  <v-btn
                    icon
                    color="red"
                    @click.prevent="removeWebsite(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <v-footer app fixed class="d-flex justify-center">
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto my-4" max-width="400" elevation="0" color="#272727">
              <v-card-text>
                <v-text-field
                  v-model="newWebsite.name"
                  label="Nom*"
                  dense
                  required
                  hide-details
                  class="mb-2"
                  outlined
                />
                <v-text-field
                  v-model="newWebsite.url"
                  label="Lien*"
                  dense
                  required
                  hide-details
                  outlined
                  class="mb-2"
                  @keyup.enter="addWebsite"
                />
                <v-text-field
                  v-model="newWebsite.icon"
                  label="Icône (URL)"
                  dense
                  required
                  hide-details
                  outlined
                  @keyup.enter="addWebsite"
                />
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  :disabled="!newWebsite.name || !newWebsite.url"
                  color="primary"
                  @click="addWebsite"
                >
                  <v-icon>mdi-plus</v-icon>
                  Ajouter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>
