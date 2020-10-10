const Repository = require('../models/Repository');
const utilities = require('../utilities');
const url = require('url');
module.exports =
    class BookmarksController extends require('./Controller') {
        constructor(req, res) {
            super(req, res);
            this.reqUrl = url.parse(req.url, true);
            this.bookmarksRepository = new Repository('Bookmarks');
        }
        // GET: api/bookmarks & api/bookmarks?wtv="also wtv"
        get(id) {
            let request = this.reqUrl.query;
            let keys = Object.keys(request);
            let res = this.bookmarksRepository.getAll();
            console.log(request)
            console.log(keys)
            if (!isNaN(id))
                this.response.JSON(this.bookmarksRepository.get(id));
            else if (request == null)
                this.response.JSON(res)
            else if (keys.length == 0)
                this.response.JSON({"Message": "Utilisez sort, name ou category"});
            if ("sort" in request)
                if (request.sort == "name" || request.sort == "category")
                    res = utilities.sortBy(request.sort, res);
            if ("name"in request){
                if ((request.name).endsWith('*'))
                    res = utilities.allNamelike(request.name, res);
                else
                    res = this.bookmarksRepository.get(utilities.getIdByName(request.name, res));
                }
            if ("category"in request)
                res = utilities.allWhereCategoryIs(request.category, res);
            this.response.JSON(res);
        }


        
        post(bookmark) {
            if(!utilities.validate(bookmark, this.bookmarksRepository.getAll()) == "valid")
                this.response.JSON(utilities.validate(bookmark, this.bookmarksRepository.getAll()))
            let newBookmark = this.bookmarksRepository.add(bookmark);
            if (newBookmark)
                this.response.created(newBookmark);
            else
                this.response.internalError();
        }
        
        put(bookmark) {
            if(!utilities.validate(bookmark, this.bookmarksRepository.getAll()) == "valid")
                this.response.JSON(utilities.validate(bookmark, this.bookmarksRepository.getAll()))
            if (this.bookmarksRepository.update(bookmark))
                this.response.ok();
            else
                this.response.notFound();
        }
        // DELETE: api/contacts/{id}
        remove(id) {
            if (this.bookmarksRepository.remove(id))
                this.response.accepted();
            else
                this.response.notFound();
        }
    }