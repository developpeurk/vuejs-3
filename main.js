const AddBook = {
    emits:['submittedBook'],
    template: `
    <div class="row">
       <div class="col-md-6 mx-auto my-4">
          <h3 class="border-bottom py-2">Ajouter un livre</h3>
        <form @submit="submit">
            <div class="form-group">
                <input
                      type="text"
                      v-model="book.ref"
                      class="form-control"
                      :class="book.ref.length ? validClass: errorClass"
                      placeholder="Réf">
            </div>
            <div class="form-group">
                <input
                      type="text"
                      v-model="book.title"
                      class="form-control"
                      :class="book.title.length ? validClass: errorClass"
                      placeholder="Titre">
            </div>
            <div class="form-group">
                <textarea
                        class="form-control"
                        :class="book.description.length ? validClass:errorClass"
                        v-model="book.description"
                        cols="30"
                        rows="5"
                        placeholder="Description
                ">
                </textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-primary form-control" type="submit">Valider</button>
            </div>
        </form>
      </div>
    </div>`,
    data ()
    {
        return {
            
            book: {
                ref: '',
                title: '',
                description: ''
                
            },
            errorClass: 'form-control is-invalid',
            validClass: 'form-control is-valid'
            
        }
    },
    methods: {
        submit ($event)
        {
            $event.preventDefault();
            this.$emit( "submittedBook", this.book );
            setTimeout( () =>
            {
                this.book = {
                    ref: '',
                    title: '',
                    description:''
             }   
            },2000)
        }
    }
};


const App = {
    template: `
    <div class="container">
    <AddBook @submittedBook="addBook" />
    
        <div class="row">
        
                <div class="col-md-8 mx-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Réf</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(book,index) in books" :key="index">
                                <td>{{ book.ref }}</td>
                                <td>{{ book.title }}</td>
                                <td>{{ book.description }}</td>
                                <td>
                                  <span
                                       @click="removeBook(index)"
                                       class="btn btn-danger font-weight-bold"
                                  >
                                  x
                                  </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>          
            </div>
            </div>`,
    data ()
    {
        return {
            books: [
                {
                    ref: '123GGH',
                    title: 'Javascript',
                    description: 'test book javascript',
                },
                {
                    ref: '163GGH',
                    title: 'React JS',
                    description: 'test book React JS',
                },
            ],
        };
       
    },
    components: {
        AddBook
    },
    methods: {
        removeBook ( index )
        {
            this.books.splice( index, 1 );
        },
        addBook ( book )
        {
            this.books.push( book );
        }
    }
};

Vue.createApp( App ).mount( "#app" );
