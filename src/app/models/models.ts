
export class Repartition{
  promotion = 'Promotion';
  nbrGroups: number;
  nbrPerson: number;
  trie: string;
  method: string;
}

export class Apprenant{
  nomComplet: string;
  email: string;
  telephone: string;
  promotion: any = 'Promotion';

  public toString(): string{
    return 'nom complet : ' + this.nomComplet + ' email ' + this.email + ' telephone ' + this.telephone + ' promotion ' + this.promotion;
  }
}

export class Promotion{
  annee: string;
  formation: string;
}
