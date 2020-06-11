const data = await filem.findOne({
                include: {
                  model: category
                },
                attributes: {
                  exclude: ["categoryId"],
                },
                order:[['id','DESC']]
              });