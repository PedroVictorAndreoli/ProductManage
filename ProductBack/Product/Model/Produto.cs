using Product.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Product.Model
{
    [Table("produto")]
    public partial class Produto 
    {
        [Key]
        [Column("id")]
        public int id { get; set; }


        [Column("descricao")]
        [StringLength(100)]
        public string descricao { get; set; }

        [Column("preco")]
        public decimal preco {  get; set; }

        [Column("data")]
        public DateOnly dataValidade { get; set; }
    }
}
